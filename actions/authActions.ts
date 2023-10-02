import {LoginType, RegisterType} from '../types/authType';
import {authAPI} from '../utils/api/authApi';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {dataStorage} from '../utils/handlers/dataStorage';

export const authActions = {
  login: createAsyncThunk(
    'auth/login',
    async (LoginData: LoginType, thunkAPI) => {
      try {
        const res = await authAPI.login(LoginData);
        await dataStorage.setItem('user', res.data.user._id);
        return res.data;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    },
  ),

  register: createAsyncThunk(
    'auth/register',
    async (newUser: RegisterType, thunkAPI) => {
      try {
        const res = await authAPI.register(newUser);
        await dataStorage.setItem('user', res.data.user._id);
        return res.data;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    },
  ),
};
