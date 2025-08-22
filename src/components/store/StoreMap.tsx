import { Text, View } from 'react-native';
import { NaverMapView, NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';

export default function StoreMap() {
  const store = { latitude: 37.57035, longitude: 126.9909 };

  return (
    <View style={{ height: 200 }}>
      <Text>Test Page</Text>
      <NaverMapView
        style={{ width: '100%', height: 170 }}
        initialCamera={{
          latitude: store.latitude,
          longitude: store.longitude,
          zoom: 15,
          tilt: 0,
          bearing: 0,
        }}
        isShowLocationButton={false}
        isShowScaleBar={false}
      >
        <NaverMapMarkerOverlay
          latitude={store.latitude}
          longitude={store.longitude}
          tintColor={'#000000ff'}
          // caption={{ text: '곱마니 순대국' }}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      </NaverMapView>
    </View>
  );
}
