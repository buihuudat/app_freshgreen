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
    updateSeen: (state, action) => {
      const notificationUpdated = [...state.notifications];
      notificationUpdated.map(noti => {
        if (noti._id === action.payload) {
          noti.seen = true;
        }
      });
      state.notifications = notificationUpdated;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(notificationActions.gets.fulfilled, (state, action) => {
        state.notifications = {...action.payload, seen: false};
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
export const {updateSeen} = notificationSlice.actions;
export default notificationSlice.reducer;
