import {NewsType} from '../../types/newsType';
import axiosClient from './axiosClient';

export const newsApi = {
  gets: () => axiosClient.get('/news'),
  create: (payload: NewsType) =>
    axiosClient.post<NewsType>('/news/create', payload),

  updateViewCount: (id: string) => axiosClient.put(`/news/${id}/views`),
  updateLikeCount: ({newsId, userId}: {newsId: string; userId: string}) =>
    axiosClient.put(`/news/${newsId}/like/${userId}`),
  update: (payload: NewsType) =>
    axiosClient.put(`/news/${payload._id}`, payload),

  delete: (id: string) => axiosClient.patch(`/news/${id}`),
};
