import {createAsyncThunk} from '@reduxjs/toolkit';
import {userApi} from '../utils/api/userApi';
import {UserType} from '../types/userType';
import {Alert} from 'react-native';
import {dataStorage} from '../utils/handlers/dataStorage';

export interface changeAvatarProps {
  _id: string | undefined;
  image: string;
}

export const userActions = {
  changeAvatar: async (data: changeAvatarProps) => {
    try {
      await userApi.changeAvatar(data);
      Alert.alert('Cập nhật thành công');
      return true;
    } catch (error) {
      Alert.alert('Cập nhật thất bại');
      throw error;
    }
  },
  userUpdate: createAsyncThunk(
    'user/update',
    async (data: UserType, thunkAPI) => {
      try {
        const res = await userApi.updateUser(data);
        Alert.alert('Cập nhật thành công');
        return res.data;
      } catch (error) {
        Alert.alert('Cập nhật thất bại');
        throw error;
      }
    },
  ),

  delete: async (userId: string) => {
    try {
      await userApi.deleteUser(userId);
      return true;
    } catch (error) {
      throw error;
    }
  },

  getUsers: createAsyncThunk('user/gets', async () => {
    try {
      const res = await userApi.getUsers();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  getUser: createAsyncThunk('user/get', async (_id: string) => {
    try {
      const res = await userApi.getUser(_id);
      await dataStorage.setItem('user', res.data._id);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }),
};
