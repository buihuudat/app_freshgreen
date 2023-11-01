import {SendType} from '../../types/messageType';
import axiosClient from './axiosClient';

export const messageApi = {
  send: (data: SendType) => axiosClient.post('/messages/send', data),
  get: ({from, to}: {from: string; to: string}) =>
    axiosClient.get(`/messages/get/${from}/${to}`),
};
