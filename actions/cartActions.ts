import {createAsyncThunk} from '@reduxjs/toolkit';
import {cartApi} from '../utils/api/cartApi';
import {ProductCartType} from '../types/cartType';
import {Alert} from 'react-native';
import {dataStorage} from '../utils/handlers/dataStorage';

export const cartActions = {
  getCart: createAsyncThunk('cart/getCart', async (userId: string) => {
    try {
      const res = await cartApi.getCart(userId);
      // await dataStorage.setItem('cart', res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  addProductToCart: createAsyncThunk<
    any,
    {userId: string; product: ProductCartType}
  >('cart/addProduct', async ({userId, product}) => {
    if (!userId) {
      Alert.alert('Yêu cầu đăng nhập');
      return false;
    }
    try {
      await cartApi.addProductToCart(userId, product);
      Alert.alert('Đã thêm sản phẩm vào giỏ hàng');
      return true;
    } catch (error) {
      Alert.alert('Error');
      throw error;
    }
  }),

  upCountProduct: createAsyncThunk<any, {userId: string; productId: string}>(
    'cart/upCount',
    async ({userId, productId}) => {
      try {
        await cartApi.upCountProduct(userId, productId);
        return true;
      } catch (error) {
        throw error;
      }
    },
  ),

  downCountProduct: createAsyncThunk<any, {userId: string; productId: string}>(
    'cart/downCount',
    async ({userId, productId}) => {
      try {
        await cartApi.downCountProduct(userId, productId);
        return true;
      } catch (error) {
        throw error;
      }
    },
  ),

  removeProduct: createAsyncThunk<any, {userId: string; productId: string}>(
    'cart/deleteProduct',
    async ({userId, productId}) => {
      try {
        await cartApi.removeProduct(userId, productId);
        return true;
      } catch (error) {
        throw error;
      }
    },
  ),
};
