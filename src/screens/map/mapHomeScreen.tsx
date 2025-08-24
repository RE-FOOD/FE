import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NaverMapView, NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import Geolocation from '@react-native-community/geolocation';
import pinImage from '../../assets/images/pin.png';
import useMap from '@/hooks/queries/useMap';

const MapHomeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [stores, setStores] = useState<any[]>([]);

  const { data: nearByStores } = useMap({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    queryOptions: {
      enabled: !!currentLocation,
    },
  });

  useEffect(() => {
    if (nearByStores) {
      setStores(nearByStores);
    }
  }, [nearByStores]);

  const handleCameraChanged = useCallback(
    (e: { latitude: number; longitude: number }) => {
      if (!currentLocation) return;
      const latDiff = Math.abs(e.latitude - currentLocation.latitude);
      const lonDiff = Math.abs(e.longitude - currentLocation.longitude);

      if (latDiff < 0.0001 && lonDiff < 0.0001) {
        setStores([]);
        setCurrentLocation({ latitude: e.latitude, longitude: e.longitude });
      }
    },
    [currentLocation]
  );

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
            />
          ))}
        </NaverMapView>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
