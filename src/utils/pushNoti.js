import notifee, { AndroidImportance } from '@notifee/react-native';

const displayNotification = async (message) => {
  try {
    console.log('Attempting to display notification:', message);

    await notifee.displayNotification({
      title: message.notification?.title || 'New Message',
      body: message.notification?.body || 'You received a new message.',
      android: {
        channelId: 'default',
        smallIcon: 'ic_notification',
        showTimestamp: true,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
    });

    console.log('Notification displayed successfully');
  } catch (error) {
    console.error('Failed to display notification:', error);
    throw error;
  }
};

export default {
  displayNoti: (remoteMessage) => displayNotification(remoteMessage),
};
