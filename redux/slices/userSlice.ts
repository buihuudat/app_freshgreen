import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {userActions} from '../../actions/userActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';
import {InitialUser, UserType} from '../../types/userType';
import {authActions} from '../../actions/authActions';

export interface UserStateProps {
  users: Array<UserType>;
  user: UserType | null;
  isLoading: boolean;
  error: boolean;
  errMsg: string;
  userViewData: UserType;
  inLogin: boolean;
}

const initialState: UserStateProps = {
  users: [],
  user: null,
  isLoading: false,
  error: false,
  errMsg: '',
  userViewData: InitialUser,
  inLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserReducer: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    userChangeAvatar: (
      state,
      action: PayloadAction<{_id: string; avatar: string}>,
    ) => {
      if (state.user) {
        state.user.avatar = action.payload?.avatar;
      }
    },
    deleteUser: (
      state,
      action: PayloadAction<{_id: string | null | undefined}>,
    ) => {
      state.users.filter(user => !(user._id === action.payload._id));
    },
    setViewUserData: (state, action: PayloadAction<UserType>) => {
      state.userViewData = action.payload;
    },
    userLogout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authActions.login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.inLogin = true;
      })
      .addCase(authActions.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.inLogin = true;
      })
      .addCase(userActions.getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(userActions.getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(userActions.userUpdate.fulfilled, (state, action) => {
        if (state?.user?._id === action.payload._id)
          state.user = action.payload;
        state.userViewData = action.payload;
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

export const {
  setUserReducer,
  userChangeAvatar,
  deleteUser,
  setViewUserData,
  userLogout,
} = userSlice.actions;
export default userSlice.reducer;
