import axiosClient from './axiosClient';

export const notificationApi = {
  gets: () => axiosClient.get('/notifications'),
  pushToken: ({
    token,
    id,
    platform = 'mobile',
  }: {
    token: string;
    id: string;
    platform?: string;
  }) => axiosClient.put('/notifications/token/push', {token, id, platform}),
  sliceToken: ({
    token,
    id,
    platform = 'mobile',
  }: {
    token: string;
    id: string;
    platform?: string;
  }) => axiosClient.put('/notifications/token/slice', {token, id, platform}),
};
