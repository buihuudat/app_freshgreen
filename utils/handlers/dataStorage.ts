import AsyncStorage from '@react-native-async-storage/async-storage';

type KeyProps =
  | 'user'
  | 'cart'
  | 'client_secret'
  | 'order'
  | 'favorite'
  | 'productCompare'
  | 'product'
  | 'shop'
  | 'categories'
  | 'news';

export const dataStorage = {
  setItem: async (key: KeyProps, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  },

  getItem: async (key: KeyProps) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value || value === null) return null;
      return JSON.parse(value);
    } catch (error) {
      throw error;
    }
  },
  getMultiple: async (keys: Array<KeyProps>) => {
    try {
      const values = await AsyncStorage.multiGet(keys);
      const result: {[key: string]: any} = {};
      values.forEach(([key, value]) => {
        result[key] = value;
      });

      return result;
    } catch (e) {
      throw e;
    }
  },

  mergeItem: async (key: KeyProps, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw error;
    }
  },

  removeItem: async (key: KeyProps) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw error;
    }
  },

  removeAllItem: async () => await AsyncStorage.clear(),
};
