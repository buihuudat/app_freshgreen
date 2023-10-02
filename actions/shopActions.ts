import {createAsyncThunk} from '@reduxjs/toolkit';
import {shopAPI} from '../utils/api/shopApi';
import {ShopType} from '../types/shopType';
import {dataStorage} from '../utils/handlers/dataStorage';

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
  create: createAsyncThunk(
    'shop/create',
    async (newShop: ShopType, thunkAPI) => {
      try {
        const shops = await shopAPI.create(newShop);
        return shops.data;
      } catch (error: any) {
        throw error;
      }
    },
  ),
  update: createAsyncThunk(
    'shop/update',
    async (newShop: ShopType, thunkAPI) => {
      try {
        const shops = await shopAPI.update(newShop);
        return shops.data;
      } catch (error: any) {
        throw error;
      }
    },
  ),
  delete: createAsyncThunk('shop/delete', async (id: string) => {
    try {
      const shops = await shopAPI.delete(id);
      return shops.data;
    } catch (error: any) {
      throw error;
    }
  }),
};
