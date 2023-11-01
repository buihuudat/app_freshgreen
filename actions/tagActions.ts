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
};
