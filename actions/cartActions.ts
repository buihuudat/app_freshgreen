import {createAsyncThunk} from '@reduxjs/toolkit';
import {cartApi} from '../utils/api/cartApi';
import {ProductCartType} from '../types/cartType';
import Toast from 'react-native-toast-message';
import {socket} from '../utils/handlers/socketConnect';

export const cartActions = {
  getCart: createAsyncThunk('cart/getCart', async (userId: string) => {
    try {
      const res = await cartApi.getCart(userId);
      // await dataStorage.setItem('cart', res.data);
      // socket.emit('create-order', res.data);
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
      return Toast.show({type: 'error', text1: 'Yêu cầu đăng nhập'});
    }
    try {
      await cartApi.addProductToCart(userId, product);
      Toast.show({type: 'success', text1: 'Đã thêm sản phẩm vào giỏ hàng'});
      return true;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Không thể thêm sản phẩm này vào giỏ hàng',
      });
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
