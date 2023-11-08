import {createAsyncThunk} from '@reduxjs/toolkit';
import {notificationApi} from '../utils/api/notificationApi';

export const notificationActions = {
  get: createAsyncThunk('notification/get', async (userId: string) => {
    try {
      const res = await notificationApi.get(userId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  seen: createAsyncThunk(
    'notification/seen',
    async (notificationId: string) => {
      try {
        await notificationApi.seen(notificationId);
        return true;
      } catch (error) {
        return false;
      }
    },
  ),
};
