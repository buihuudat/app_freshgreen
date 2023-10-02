import {createSlice} from '@reduxjs/toolkit';
import {favoriteActions} from '../../actions/favoriteActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';
import {ProductType} from '../../types/productType';

interface InitialStateProps {
  favoriteProducts: Array<ProductType>;
  loading: boolean;
  isFavorite: boolean;
}

const initialState: InitialStateProps = {
  favoriteProducts: [],
  loading: false,
  isFavorite: false,
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.favoriteProducts = action.payload;
    },
    clearFavorite: state => {
      state.favoriteProducts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(favoriteActions.get.fulfilled, (state, action) => {
        if (action.payload) {
          const products = action.payload.products;
          const updateFvorite = products.map(
            ({product}: {product: ProductType}) => product,
          );
          state.favoriteProducts = [...updateFvorite];
        }
      })
      .addCase(favoriteActions.update.fulfilled, (state, action) => {
        const id = action.payload._id;
        const index = state.favoriteProducts.findIndex(
          product => product._id === id,
        );

        if (index !== -1) {
          state.favoriteProducts = state.favoriteProducts.filter(
            product => product._id !== id,
          );
        } else {
          state.favoriteProducts.push(action.payload);
        }
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

export const {setFavorite, clearFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;
