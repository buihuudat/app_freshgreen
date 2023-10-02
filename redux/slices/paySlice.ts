import {createSlice} from '@reduxjs/toolkit';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface InitialStateProps {
  amount: number;
  loading: boolean;
}

const initialState: InitialStateProps = {
  amount: 0,
  loading: false,
};

export const paySlice = createSlice({
  name: 'pay',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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

export default paySlice.reducer;
