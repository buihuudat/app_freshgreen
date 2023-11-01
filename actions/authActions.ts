import {LoginSocialType, LoginType, RegisterType} from '../types/authType';
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

  google: createAsyncThunk(
    'auth/google',
    async (user: LoginSocialType, thunkAPI) => {
      try {
        const res = await authAPI.google(user);
        await dataStorage.setItem('user', res.data.user._id);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    },
  ),

  facebook: createAsyncThunk(
    'auth/facebook',
    async (user: LoginSocialType, thunkAPI) => {
      try {
        const res = await authAPI.facebook(user);
        await dataStorage.setItem('user', res.data.user._id);
        return true;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    },
  ),

  sms: createAsyncThunk('auth/login/sms', async (phone: string, thunkAPI) => {
    try {
      const res = await authAPI.loginWithSMS(phone);
      await dataStorage.setItem('user', res.data.user._id);
      return true;
    } catch (error: any) {
      if (error.data) return thunkAPI.rejectWithValue(error.data);
      throw error;
    }
  }),

  resetPassword: createAsyncThunk<
    any,
    {email: string; password: string; confirmPassword: string}
  >('user/reset-password', async ({email, password, confirmPassword}) => {
    try {
      const res = await authAPI.resetPassword({
        email,
        password,
        confirmPassword,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
