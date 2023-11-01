import {createAsyncThunk} from '@reduxjs/toolkit';
import {shopAPI} from '../utils/api/shopApi';

export const shopActions = {
  gets: createAsyncThunk('shop/gets', async () => {
    try {
      const shops = await shopAPI.gets();
      // await dataStorage.setItem('shop', shops.data);
      return shops.data;
    } catch (error) {
      throw error;
    }
  }),
  get: createAsyncThunk('shop/get', async (id: string) => {
    try {
      const shops = await shopAPI.get(id);
      return shops.data;
    } catch (error: any) {
      throw error;
    }
  }),
  updateFollow: createAsyncThunk<any, {shopId: string; userId: string}>(
    'shop/follow',
    async ({shopId, userId}) => {
      try {
        const res = await shopAPI.updateFollow({shopId, userId});
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  ),
};
