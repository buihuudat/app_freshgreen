import {createAsyncThunk} from '@reduxjs/toolkit';
import {SendType} from '../types/messageType';
import {messageApi} from '../utils/api/messageApi';

export const messageActions = {
  send: createAsyncThunk('message/send', async (data: SendType) => {
    try {
      const res = await messageApi.send(data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  get: createAsyncThunk(
    'message/get',
    async (data: {from: string; to: string}) => {
      try {
        const res = await messageApi.get(data);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  ),
};
