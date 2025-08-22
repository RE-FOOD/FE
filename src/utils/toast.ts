import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

const showToast = (type: ToastType, text1: string, text2?: string) => {
  Toast.show({
    type,
    text1,
    ...(text2 ? { text2 } : {}),
    position: 'bottom',
    visibilityTime: 2000,
  });
};

export { showToast };
