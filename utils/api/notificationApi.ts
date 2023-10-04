import axiosClient from './axiosClient';

export const notificationApi = {
  gets: () => axiosClient.get('/notification'),
};
