import React, { useState } from 'react';
import { View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingScreen from '../_common/LoadingScreen';
import { userNavigations } from '@/constants/navigations';
import useLocation from '@/hooks/queries/useLocation';
import { UserStackParamList } from '@/navigations/stack/UserStackNavigator';
import { parseDaumRoadAddress } from '@/utils/address';

type NavigationProp = StackNavigationProp<UserStackParamList, 'LocationPostcode'>;

const LocationPostcodeScreen = () => {
  const { addLocationMutation } = useLocation();
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);

  const postcodeHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
      <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
      <style>
        body, html { width: 100%; height: 100%; margin: 0; padding: 0; }
        #container { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="container"></div>
      <script>
        function init() {
          new daum.Postcode({
            oncomplete: function(data) {
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            },
            width: '100%',
            height: '100%',
            animation: true,
            hideMapBtn: true, 
          }).embed(document.getElementById('container'));
          
          // 다음 우편번호 서비스가 완전히 로드되었음을 알림
          setTimeout(() => {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOADED' }));
          }, 100);
        }
       
        window.addEventListener('DOMContentLoaded', init);
      </script>
    </body>
    </html>
  `;

  const handleMessage = async (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      // 로딩 완료
      if (data.type === 'LOADED') {
        setLoading(false);
        return;
      }

      // 주소 선택 완료
      const parsed = parseDaumRoadAddress(data);

      addLocationMutation.mutate({
        address: parsed.formattedFull,
        roadAddress: parsed.formattedShort,
      });
      navigation.navigate(userNavigations.LOCATION);
    } catch (error) {
      console.error('Error parsing postcode data:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        collapsable={false}
        removeClippedSubviews={false}
        style={{ flex: 1 }}
        source={{
          html: postcodeHTML,
          baseUrl: 'https://postcode.map.daum.net',
        }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['*']}
        onLoadStart={() => setLoading(true)}
        onError={() => setLoading(false)}
        onHttpError={() => setLoading(false)}
      />

      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingScreen />
        </View>
      )}
    </View>
  );
};

export default LocationPostcodeScreen;
