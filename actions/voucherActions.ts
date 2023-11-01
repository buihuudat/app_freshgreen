import {createAsyncThunk} from '@reduxjs/toolkit';
import {voucherApi} from '../utils/api/voucherApi';

export interface VoucherActionsType {
  _id?: string;
  voucher?: string;
  discount?: number;
  author?: string;
  lastDate?: string;
}

export const voucherActions = {
  gets: createAsyncThunk('voucher/gets', async () => {
    try {
      const res = await voucherApi.gets();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
  get: createAsyncThunk('voucher/get', async (voucher: string, thunkAPI) => {
    try {
      const res = await voucherApi.get(voucher);
      return res.data;
    } catch (error: any) {
      if (error.data) {
        return thunkAPI.rejectWithValue(error.data);
      }
      throw error;
    }
  }),
};
