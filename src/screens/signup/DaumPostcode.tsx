import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { DaumPostcodeData } from '@/types/postcode';

interface DaumPostcodeProps {
  onSubmit: (data: DaumPostcodeData) => void;
}

const DaumPostcode = ({ onSubmit }: DaumPostcodeProps) => {
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
        }
       
        window.addEventListener('DOMContentLoaded', init);
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      onSubmit(data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <WebView
      className="flex flex-1"
      source={{
        html: postcodeHTML,
        baseUrl: 'https://postcode.map.daum.net',
      }}
      onMessage={handleMessage}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      originWhitelist={['*']}
    />
  );
};

export default DaumPostcode;
