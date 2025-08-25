import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Platform, View, Text, Modal, Pressable, Image } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NaverMapView, NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Geolocation from '@react-native-community/geolocation';
import pinImage from '../../assets/images/pin.png';
import StarIcon from '@/assets/icons/star.svg';
import { colors } from '@/constants/colors';
import mapHooks from '@/hooks/queries/useMap';

const MapHomeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStore, setSelectedStore] = useState<any | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const { data: nearByStores } = mapHooks.useMap({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    queryOptions: {
      enabled: !!currentLocation,
    },
  });

  const { data: storeSummary } = mapHooks.useStoreSummary(
    selectedStore?.id ?? 0,
    currentLocation?.latitude ?? 0,
    currentLocation?.longitude ?? 0
  );

  useEffect(() => {
    if (nearByStores) {
      setStores(nearByStores);
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
  const handleMarkerPress = useCallback((store: any) => {
    setSelectedStore(store);
    setShowPopup(true);
  }, []);

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
            console.log('현재 위치 좌표:', latitude, longitude);
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
              image={pinImage}
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
        <Pressable style={styles.modalOverlay} onPress={closePopup}>
          <Pressable onPress={(e) => e.stopPropagation()}>
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
                <View style={styles.infoContainer}>
                  <Text style={styles.popupTitle}>{storeSummary?.data?.name}</Text>
                  <Text style={styles.popupTime}>픽업:{storeSummary?.data?.pickupTime}</Text>
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
              </View>
            </View>
          </Pressable>
        </Pressable>
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
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 65,
    paddingHorizontal: 20,
  },
  popup: {
    width: 330,
    backgroundColor: colors.WHITE,
    padding: 16,
    borderRadius: 20,
    gap: 5,
  },
  infoContainer: {
    flexDirection: 'column',
  },
  popupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  storeImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  star: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
  },
  popupTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Regular',
    color: colors.BLACK,
  },
  popupTime: {
    fontSize: 14,
    color: colors.BLACK,
    lineHeight: 20,
  },
  pinImage: {
    width: 14,
    height: 14,
  },
  storeImgContainer: {
    flexDirection: 'row',
  },
});

export default MapHomeScreen;
