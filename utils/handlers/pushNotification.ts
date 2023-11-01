import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {dataStorage} from './dataStorage';
import {notificationApi} from '../api/notificationApi';
import Toast from 'react-native-toast-message';

export const pushNotification = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Toast.show({type: 'success', text1: remoteMessage.notification?.body});
      return unsubscribe;
    });
  }, []);
};

export async function getToken() {
  try {
    const user = await dataStorage.getItem('user');

    const token = await messaging().getToken();
    await notificationApi.pushToken({token, id: user});

    return token;
  } catch (error) {
    console.error('Error in getToken:', error);
    throw error;
  }
}
