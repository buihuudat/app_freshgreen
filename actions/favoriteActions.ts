import {createAsyncThunk} from '@reduxjs/toolkit';
import {favoriteApi} from '../utils/api/favoriteApi';
import {ProductType} from '../types/productType';
import {dataStorage} from '../utils/handlers/dataStorage';
import Toast from 'react-native-toast-message';

export const favoriteActions = {
  get: createAsyncThunk('favorite/get', async (userId: string) => {
    try {
      const res = await favoriteApi.get(userId);
      // await dataStorage.setItem(
      //   'favorite',
      //   res.data.products.map(({product}: {product: ProductType}) => product),
      // );
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  update: createAsyncThunk<any, {userId: string; product: ProductType}>(
    'favorite/update',
    async ({userId, product}) => {
      try {
        await favoriteApi.update({userId, productId: product._id as string});
        return product;
      } catch (error) {
        Toast.show({type: 'error', text1: 'Cập nhật thất bại'});
        throw error;
      }
    },
  ),
};
