import {createSlice} from '@reduxjs/toolkit';
import {TagType, initialTag} from '../../types/tagType';
import {tagActions} from '../../actions/tagActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface IntitialProps {
  tags: TagType[];
  tag: TagType;
  isLoading: boolean;
}

const initialState: IntitialProps = {
  tags: [],
  tag: initialTag,
  isLoading: true,
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(tagActions.gets.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(tagActions.get.fulfilled, (state, action) => {
        state.tag = action.payload;
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

export default tagSlice.reducer;
