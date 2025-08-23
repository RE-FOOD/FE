import { View } from 'react-native';
import { NaverMapView, NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';

type StoreMapProps = {
  latitude?: number;
  longitude?: number;
};

export default function StoreMap({ latitude, longitude }: StoreMapProps) {
  if (!latitude || !longitude) return null;

  return (
    <View style={{ height: 200 }}>
      <NaverMapView
        style={{ width: '100%', height: 200 }}
        initialCamera={{
          latitude,
          longitude,
          zoom: 15,
          tilt: 0,
          bearing: 0,
        }}
        isShowLocationButton={false}
        isShowScaleBar={false}
      >
        <NaverMapMarkerOverlay
          latitude={latitude}
          longitude={longitude}
          tintColor={'#270000f8'}
          anchor={{ x: 0.5, y: 0.5 }}
          image={require('@/assets/images/pin.png')}
          // caption={{ text: '곱마니 순대국' }}
        />
      </NaverMapView>
    </View>
  );
}
