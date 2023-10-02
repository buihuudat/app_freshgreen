import {createSlice} from '@reduxjs/toolkit';
import {NewsType} from '../../types/newsType';
import {newsActions} from '../../actions/newsActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface InitialProps {
  newsList: NewsType[];
  isLoading: boolean;
  modal: {
    open: boolean;
    data?: NewsType;
  };
}

const initialState: InitialProps = {
  newsList: [],
  isLoading: false,
  modal: {
    open: false,
    data: undefined,
  },
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsModel: (state, action) => {
      state.modal = action.payload;
    },
    setNewsList: (state, action) => {
      state.newsList = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(newsActions.gets.fulfilled, (state, action) => {
        state.newsList = action.payload.newsList;
      })
      .addCase(newsActions.create.fulfilled, (state, action) => {
        state.newsList.push(action.payload);
      })
      .addCase(newsActions.update.fulfilled, (state, action) => {
        state.newsList.find((news, index) => {
          if (news._id === action.payload._id) {
            state.newsList[index] = action.payload;
          }
          return state;
        });
      })
      .addCase(newsActions.updateViewCount.fulfilled, (state, action) => {
        const newsListUpdated = state.newsList.map(news => {
          if (news._id === action.meta.arg) {
            return {
              ...news,
              viewCount: news.viewCount! + 1,
            };
          }
          return news;
        });
        state.newsList = newsListUpdated;
      })
      .addCase(newsActions.updateLikeCount.fulfilled, (state, action) => {
        const {newsId, userId} = action.meta.arg;
        const index = state.newsList.findIndex(news => news._id === newsId);

        if (index !== -1) {
          const newsListUpdated = [...state.newsList];
          const newsToUpdate = {...newsListUpdated[index]};

          if (!newsToUpdate.likeCount) {
            newsToUpdate.likeCount = [];
          }

          if (newsToUpdate.likeCount.includes(userId)) {
            newsToUpdate.likeCount = newsToUpdate.likeCount.filter(
              l => l !== userId,
            );
          } else {
            newsToUpdate.likeCount.push(userId);
          }

          newsListUpdated[index] = newsToUpdate;
          state.newsList = newsListUpdated;
        }
      })
      .addCase(newsActions.delete.fulfilled, (state, action) => {
        const newsIndex = state.newsList.findIndex(
          news => news._id === action.meta.arg,
        );
        state.newsList.splice(newsIndex, 1);
      })
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
        },
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        action =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        state => {
          state.isLoading = false;
        },
      );
  },
});

export const {setNewsModel, setNewsList} = newsSlice.actions;
export default newsSlice.reducer;
