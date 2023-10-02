import {createAsyncThunk} from '@reduxjs/toolkit';
import {tagApi} from '../utils/api/tagApi';

export interface TagActionsType {
  _id?: string;
  name?: string;
  createdAt?: string;
}

export const tagActions = {
  gets: createAsyncThunk('tag/gets', async () => {
    try {
      const res = await tagApi.gets();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  get: createAsyncThunk('tag/get', async (data: TagActionsType) => {
    try {
      const res = await tagApi.get(data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  create: createAsyncThunk(
    'tag/create',
    async (data: TagActionsType, thunkAPI) => {
      try {
        const res = await tagApi.create(data);
        return res.data;
      } catch (error: any) {
        throw error;
      }
    },
  ),
  delete: createAsyncThunk('tag/delete', async (data: TagActionsType) => {
    try {
      const res = await tagApi.delete(data);
      return true;
    } catch (error: any) {
      throw error;
    }
  }),
};
