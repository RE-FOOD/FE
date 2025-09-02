/**
 * @format
 */

import { AppRegistry } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';

// messaging().setBackgroundMessageHandler(async (remoteMessage) => {
//   console.log('FCM message received in background:', remoteMessage);

//   // 바로 notifee로 표시
//   await notifee.displayNotification({
//     title: remoteMessage.notification?.title || 'Background Message',
//     body: remoteMessage.notification?.body || 'You received a new background message.',
//     android: { channelId: 'default' },
//   });
// });

notifee.onBackgroundEvent(async ({ type, detail }) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('Notification dismissed:', detail.notification?.id);
      break;
    case EventType.PRESS:
      console.log('Notification pressed:', detail.notification?.id);
      // TODO: 네비게이션 이동
      break;
  }
});

AppRegistry.registerComponent(appName, () => App);
