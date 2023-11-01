import {createAsyncThunk} from '@reduxjs/toolkit';
import {newsApi} from '../utils/api/newsApi';

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
