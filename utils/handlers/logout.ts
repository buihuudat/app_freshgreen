import {AnyAction, Dispatch} from '@reduxjs/toolkit';
import {dataStorage} from './dataStorage';
import auth from '@react-native-firebase/auth';
import {userLogout} from '../../redux/slices/userSlice';
import {clearCart} from '../../redux/slices/cartSlice';
import {clearCartOrder} from '../../redux/slices/orderSlice';
import {clearFavorite} from '../../redux/slices/favoriteSlice';
import {clearNotifications} from '../../redux/slices/notificationSlice';

export const logout = async (dispatch: Dispatch<AnyAction>) => {
  const promises = [
    dataStorage.removeItem('user'),
    dataStorage.removeItem('cart'),
    dataStorage.removeItem('order'),
    dataStorage.removeItem('favorite'),
  ];

  dispatch(userLogout());
  dispatch(clearCart());
  dispatch(clearCartOrder());
  dispatch(clearFavorite());
  dispatch(clearNotifications());

  await Promise.allSettled(promises);

  if (auth().currentUser) {
    await auth().signOut();
  }
};
