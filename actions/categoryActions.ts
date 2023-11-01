import {createAsyncThunk} from '@reduxjs/toolkit';
import {categoryApi} from '../utils/api/categoryApi';
import {CategoryType} from '../types/categoryType';

export const categoryActions = {
  gets: createAsyncThunk('category/gets', async () => {
    try {
      const res = await categoryApi.gets();
      // await dataStorage.setItem('categories', res.data);
      return res.data;
    } catch (err: any) {
      throw err;
    }
  }),

  get: createAsyncThunk('category/get', async (category: CategoryType) => {
    try {
      const res = await categoryApi.get(category);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }),
};
