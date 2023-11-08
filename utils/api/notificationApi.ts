import axiosClient from './axiosClient';

export const notificationApi = {
  get: (userId: string) => axiosClient.get(`/notifications/${userId}`),
  seen: (notificationId: string) =>
    axiosClient.put(`/notifications/${notificationId}/seen`),
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
