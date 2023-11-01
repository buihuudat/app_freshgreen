import {createSlice} from '@reduxjs/toolkit';
import {CategoryType, initialCategory} from '../../types/categoryType';
import {categoryActions} from '../../actions/categoryActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface InitialProps {
  categories: Array<CategoryType>;
  category: CategoryType;
  loading: boolean;
}

const initialState: InitialProps = {
  categories: [],
  category: initialCategory,
  loading: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(categoryActions.gets.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(categoryActions.get.fulfilled, (state, action) => {
        state.category = action.payload;
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

export const {setCategories} = categorySlice.actions;

export default categorySlice.reducer;
