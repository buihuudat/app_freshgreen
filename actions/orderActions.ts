import {createAsyncThunk} from '@reduxjs/toolkit';
import {orderApi} from '../utils/api/orderApi';
import {OrderItemType, OrderStatus, SubmitProps} from '../types/orderType';
import {dataStorage} from '../utils/handlers/dataStorage';
import {Alert} from 'react-native';

export const orderActions = {
  getOrders: createAsyncThunk('/order/gets', async (userId: string) => {
    try {
      const res = await orderApi.getOrders(userId);
      // await dataStorage.setItem('order', res.data.orders);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  createOrder: createAsyncThunk<any, {userId: string; order: OrderItemType}>(
    '/order/create',
    async ({userId, order}) => {
      try {
        const res = await orderApi.createOrder(userId, order);
        Alert.alert('Đơn hàng đã được đặt');
        return res.data;
      } catch (error) {
        Alert.alert('Đặt hàng thất bại');
        throw error;
      }
    },
  ),

  submitStatusOrder: createAsyncThunk<
    {orderId: string; status: OrderStatus.done; message?: string},
    SubmitProps
  >('order/status', async ({userId, orderId, status, message}) => {
    try {
      const res = await orderApi.statusOrder({
        userId,
        orderId,
        status:
          status === OrderStatus.done ? OrderStatus.done : OrderStatus.refuse,
        message,
      });
      Alert.alert(
        `${status === OrderStatus.done ? 'Cảm ơn bạn' : 'Đã Từ chối đơn hàng'}`,
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }),
};
