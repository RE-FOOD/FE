import EncryptedStorage from 'react-native-encrypted-storage';

const setEncryptStorage = async <T>(key: string, data: T) => {
  try {
    const jsonValue = JSON.stringify(data);
    if (jsonValue) {
      await EncryptedStorage.setItem(key, jsonValue);
    }
  } catch (error) {
    console.error(`[Storage] Error setting ${key}:`, error);
    throw error;
  }
};

const getEncryptStorage = async (key: string) => {
  try {
    const storedData = await EncryptedStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error(`[Storage] Error getting ${key}:`, error);
    return null;
  }
};

const removeEncryptStorage = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Error removing ${key}:`, error);
  }
};

export { setEncryptStorage, getEncryptStorage, removeEncryptStorage };
