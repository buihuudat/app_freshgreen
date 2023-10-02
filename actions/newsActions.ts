import {createAsyncThunk} from '@reduxjs/toolkit';
import {newsApi} from '../utils/api/newsApi';
import {NewsType} from '../types/newsType';
import {AxiosResponse} from 'axios';
import {dataStorage} from '../utils/handlers/dataStorage';

export const newsActions = {
  gets: createAsyncThunk('news/gets', async () => {
    try {
      const res = await newsApi.gets();
      // await dataStorage.setItem('news', res.data);
      return res.data;
    } catch (err) {
      throw err;
    }
  }),

  get: createAsyncThunk('news/get', async (_id: string, thunkAPI) => {
    try {
      // const res = await newsApi.gets(_id)
    } catch (error) {}
  }),

  create: createAsyncThunk('news/create', async (news: NewsType, thunkAPI) => {
    try {
      const res: AxiosResponse<NewsType> = await newsApi.create(news);
      return res.data;
    } catch (error: any) {
      if (error.data) {
        return thunkAPI.rejectWithValue(error.data);
      }
      throw error;
    }
  }),

  update: createAsyncThunk('news/update', async (news: NewsType, thunkAPI) => {
    try {
      const res = await newsApi.update(news);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }),

  delete: createAsyncThunk('news/delete', async (_id: string) => {
    try {
      const res = await newsApi.delete(_id);
      return true;
    } catch (error: any) {
      throw error;
    }
  }),

  updateViewCount: createAsyncThunk(
    'news/update/viewCount',
    async (_id: string) => {
      try {
        await newsApi.updateViewCount(_id);
        return true;
      } catch (error) {
        throw error;
      }
    },
  ),
  updateLikeCount: createAsyncThunk<any, {newsId: string; userId: string}>(
    'news/update/likeCount',
    async ({newsId, userId}) => {
      try {
        await newsApi.updateLikeCount({newsId, userId});
        return true;
      } catch (error) {
        throw error;
      }
    },
  ),
};
