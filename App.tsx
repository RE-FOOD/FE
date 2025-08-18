import React, { useEffect } from 'react';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { FirebaseMessagingTypes, getMessaging, onMessage } from '@react-native-firebase/messaging';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/api/queryClient';
import { NotificationProvider } from '@/hooks/useNotification';
import RootNavigator from '@/navigations/root/RootNavigator';
import pushNoti from '@/utils/pushNoti';

const AppTheme = {
  ...DefaultTheme,
};

function AppContent() {
  useEffect(() => {
    async function setupNotificationChannel() {
      try {
        const channel = await notifee.createChannel({
          id: 'default',
          name: 'RE:FOOD',
          importance: AndroidImportance.HIGH,
        });
        console.log('Notification channel created:', channel);

        // 채널 존재 확인
        const channels = await notifee.getChannels();
        console.log('Available channels:', channels);
      } catch (error) {
        console.error('Error creating notification channel:', error);
      }
    }
    setupNotificationChannel();
  }, []);

  useEffect(() => {
    const messagingInstance = getMessaging();
    const unsubscribe = onMessage(
      messagingInstance,
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('FCM message received:', remoteMessage);
        pushNoti.displayNoti(remoteMessage);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={AppTheme}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}
export default App;
