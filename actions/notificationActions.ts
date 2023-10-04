import {createAsyncThunk} from '@reduxjs/toolkit';
import {notificationApi} from '../utils/api/notificationApi';

export const notificationActions = {
  gets: createAsyncThunk('/gets', async () => {
    try {
      const res = await notificationApi.gets();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
