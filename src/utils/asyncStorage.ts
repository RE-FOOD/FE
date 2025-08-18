import AsyncStorage from '@react-native-async-storage/async-storage';

const setAsyncData = async <T>(key: string, value: T) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

const getAsyncData = async (key: string) => {
  const result = await AsyncStorage.getItem(key);
  return result && JSON.parse(result);
};

const removeAsyncData = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

export { setAsyncData, getAsyncData, removeAsyncData };
