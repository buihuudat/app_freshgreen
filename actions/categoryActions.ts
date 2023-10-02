import {createAsyncThunk} from '@reduxjs/toolkit';
import {categoryApi} from '../utils/api/categoryApi';
import {CategoryType} from '../types/categoryType';
import {dataStorage} from '../utils/handlers/dataStorage';

export const categoryActions = {
  gets: createAsyncThunk('/getCategories', async () => {
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

  create: createAsyncThunk(
    'category/create',
    async (data: CategoryType, thunkAPI) => {
      try {
        const res = await categoryApi.create(data);
        return res.data;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    },
  ),

  update: createAsyncThunk(
    'category/update',
    async (category: CategoryType, thunkAPI) => {
      try {
        const res = await categoryApi.update(category);
        return res.data;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    },
  ),

  delete: createAsyncThunk('category/delete', async (data: CategoryType) => {
    try {
      await categoryApi.delete(data);
      return true;
    } catch (error: any) {
      throw error;
    }
  }),
};
