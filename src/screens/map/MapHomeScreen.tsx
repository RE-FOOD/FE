import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Platform, View, Text, Modal, Pressable, Image } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NaverMapView, NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import closedPin from '../../assets/images/closedPin.png';
import pinImage from '../../assets/images/pin.png';
import LikeIcon from '@/assets/icons/like.svg';
import List from '@/assets/icons/list.svg';
import StarIcon from '@/assets/icons/star.svg';
import UnlikeIcon from '@/assets/icons/unlike.svg';
import { colors } from '@/constants/colors';
import { userNavigations } from '@/constants/navigations';
import useToggleFavorite from '@/hooks/queries/useLike';
import mapHooks from '@/hooks/queries/useMap';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { Map } from '@/types/domain';

type Navigation = StackNavigationProp<UserStackParamList, typeof userNavigations.STORE_LIST>;
type MapWithOpen = Map & { isOpen: boolean };

const MapHomeScreen = () => {
  const navigation = useNavigation<Navigation>();

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [stores, setStores] = useState<MapWithOpen[]>([]);
  const [selectedStore, setSelectedStore] = useState<MapWithOpen | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const { data: nearByStores } = mapHooks.useMap({
    latitude: currentLocation?.latitude ?? 0,
    longitude: currentLocation?.longitude ?? 0,
  });

  const { data: storeSummary } = mapHooks.useStoreSummary(
    selectedStore?.id ?? 0,
    currentLocation?.latitude ?? 0,
    currentLocation?.longitude ?? 0
  );

  const toggleFavoriteMutation = useToggleFavorite();

  useEffect(() => {
    if (nearByStores) {
      setStores(
        nearByStores.map((s: Map) => ({
          ...s,
          isOpen: s.status === 'OPEN',
        }))
      );
    }
  }, [nearByStores]);

  // 사용자가 지도를 움직이거나, 현위치로 이동 버튼을 눌렀을 때만 감지
  const handleCameraChanged = useCallback(
    (e: { latitude: number; longitude: number }) => {
      if (!currentLocation) return;
      const latDiff = Math.abs(e.latitude - currentLocation.latitude);
      const lonDiff = Math.abs(e.longitude - currentLocation.longitude);
      if (latDiff > 0.001 || lonDiff > 0.001) {
        setCurrentLocation({ latitude: e.latitude, longitude: e.longitude });
      }
    },
    [currentLocation]
  );

  // 마커 클릭 핸들러
  const handleMarkerPress = useCallback((store: MapWithOpen) => {
    setSelectedStore(store);
    setShowPopup(true);
  }, []);

  // 하트 토글 핸들러 - API 요청과 함께
  // const handleToggleFavorite = useCallback(() => {
  //   if (!selectedStore?.id) return;
  //   toggleFavoriteMutation.mutate(selectedStore.id);
  // }, [selectedStore?.id, toggleFavoriteMutation]);

  // 팝업 닫기
  const closePopup = () => {
    setShowPopup(false);
    setSelectedStore(null);
  };

  // 위치 권한 요청 후 위치 가져오기
  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
          },
          (error) => {
            console.error('위치 획득 실패:', error);
          },
          { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
        );
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavigateToList = () => {
    closePopup();
    setTimeout(() => {
      navigation.navigate(userNavigations.STORE_LIST, {
        latitude: currentLocation!.latitude,
        longitude: currentLocation!.longitude,
      });
    }, 100);
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {currentLocation ? (
        <NaverMapView
          style={StyleSheet.absoluteFill}
          isShowLocationButton={true}
          onCameraChanged={handleCameraChanged}
          initialCamera={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            zoom: 16,
          }}
        >
          {stores.map((store) => (
            <NaverMapMarkerOverlay
              key={store.id}
              latitude={store.latitude}
              longitude={store.longitude}
              image={store.isOpen ? pinImage : closedPin}
              width={40}
              height={40}
              anchor={{ x: 0.5, y: 1 }}
              onTap={() => handleMarkerPress(store)}
            />
          ))}
        </NaverMapView>
      ) : null}

      {/* 팝업 모달 */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={styles.modalOverlay}>
          {/* 닫기용 overlay: 팝업 바깥 눌렀을 때 닫힘 */}
          <Pressable style={StyleSheet.absoluteFill} onPress={closePopup} />

          {/* 팝업 영역 */}
          <View style={styles.bottomSheetContainer}>
            {/* 목록 보기 버튼 */}
            <Pressable style={styles.listViewButton} onPress={handleNavigateToList}>
              <List />
              <Text style={styles.listViewButtonText}>목록 보기</Text>
            </Pressable>

            {/* 카드 전체: 가게 상세 이동 */}
            <Pressable
              onPress={() => {
                console.log(storeSummary?.data?.id);
                console.log(storeSummary?.data?.name);
                closePopup();
                if (storeSummary?.data?.id && storeSummary?.data?.name) {
                  navigation.navigate(userNavigations.STORE_DETAIL, {
                    storeId: storeSummary.data.id,
                    storeName: storeSummary.data.name,
                  });
                }
              }}
            >
              <View style={styles.popup}>
                <View style={styles.popupContent}>
                  <Image
                    source={{
                      uri:
                        storeSummary?.data.imageUrl ||
                        `https://picsum.photos/seed/${selectedStore?.id}/300/200`,
                    }}
                    style={styles.storeImage}
                    resizeMode="cover"
                  />

                  <View style={styles.popupRow}>
                    <View style={styles.infoContainer}>
                      <View style={styles.heartContainer}>
                        <Text style={styles.popupTitle}>{storeSummary?.data?.name}</Text>
                      </View>
                      <Text style={styles.popupTime}>{storeSummary?.data?.pickupTime}</Text>
                      <View style={styles.info}>
                        <View style={styles.distance}>
                          <Image source={pinImage} style={styles.pinImage} />
                          <Text style={styles.popupTime}>{storeSummary?.data.distance}km</Text>
                        </View>
                        <View style={styles.star}>
                          <StarIcon width={16} height={16} fill="#FFD700" />
                          <Text style={styles.popupTime}>{storeSummary?.data.rating}</Text>
                          <Text style={styles.popupTime}>({storeSummary?.data.reviewCount})</Text>
                        </View>
                      </View>
                    </View>

                    {/* 하트 아이콘만 클릭 → 찜 토글 */}
                    <Pressable
                      onPress={(e) => {
                        e.stopPropagation(); // 카드 onPress 방지
                        if (storeSummary?.data?.id) {
                          toggleFavoriteMutation.mutate(storeSummary.data.id);
                        }
                      }}
                    >
                      {storeSummary?.data?.isFavored ? (
                        <LikeIcon width={24} height={24} />
                      ) : (
                        <UnlikeIcon width={24} height={24} />
                      )}
                    </Pressable>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    paddingBottom: 70,
    width: '100%',
  },
  popup: {
    backgroundColor: colors.WHITE,
    padding: 16,
    borderRadius: 20,
  },
  popupRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'column',
  },
  popupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  star: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  info: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
  },
  popupTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  popupTime: {
    fontSize: 14,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Regular',
    lineHeight: 20,
  },
  pinImage: {
    width: 14,
    height: 14,
  },
  storeImgContainer: {
    flexDirection: 'row',
  },
  heartContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  listViewButton: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: colors.WHITE,
    bottom: 150,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    zIndex: 1,
  },
  listViewButtonText: {
    color: colors.BLACK,
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
  bottomSheetContainer: {
    width: '100%',
    // alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
});

export default MapHomeScreen;
