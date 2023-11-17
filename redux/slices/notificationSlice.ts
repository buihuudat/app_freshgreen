import {createSlice} from '@reduxjs/toolkit';
import {NotificationType} from '../../types/NotificationType';
import {notificationActions} from '../../actions/notificationActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface InitialProps {
  notifications: Array<NotificationType>;
  loading: boolean;
}
const initialState: InitialProps = {
  notifications: [],
  loading: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotifications: state => {
      state.notifications = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(notificationActions.get.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(notificationActions.seen.fulfilled, (state, action) => {
        if (!action.payload) return;
        const notificationIndex = state.notifications.findIndex(
          notification => notification._id === action.meta.arg,
        );
        if (notificationIndex !== -1)
          state.notifications[notificationIndex].seen = true;
      })
      .addMatcher<PendingAction>(
        action => action.type.endsWith('/pending'),
        state => {
          state.loading = true;
        },
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        action =>
          action.type.endsWith('/fulfilled') ||
          action.type.endsWith('/rejected'),
        state => {
          state.loading = false;
        },
      );
  },
});

export const {clearNotifications} = notificationSlice.actions;
export default notificationSlice.reducer;
