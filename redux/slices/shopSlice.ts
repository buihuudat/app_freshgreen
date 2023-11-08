import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {InitialShop, ShopType} from '../../types/shopType';
import {shopActions} from '../../actions/shopActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface InitialStateProps {
  shop: ShopType;
  shops: Array<ShopType>;
  modal: {
    open: boolean;
    data?: ShopType;
  };
  loading: boolean;
}

const initialState: InitialStateProps = {
  shop: InitialShop,
  shops: [],
  modal: {
    open: false,
    data: undefined,
  },
  loading: false,
};

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShops: (state, action) => {
      state.shops = action.payload;
    },
    setShopModal: (state, action) => {
      state.modal = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(shopActions.gets.fulfilled, (state, action) => {
        state.shops = action.payload;
      })
      .addCase(shopActions.get.fulfilled, (state, action) => {
        state.shop = action.payload;
      })
      .addMatcher(
        isAnyOf(
          shopActions.updateFollow.pending,
          shopActions.updateFollow.rejected,
        ),
        (state, action) => {
          const userId = action.meta.arg.userId;
          const shopFollowers = state.shop.followers || [];
          const shopIndex = shopFollowers.indexOf(userId);

          if (action.type === shopActions.updateFollow.pending.type) {
            if (shopIndex === -1) {
              state.shop.followers = [...shopFollowers, userId];
            } else {
              state.shop.followers = shopFollowers.filter(fl => fl !== userId);
            }
          } else {
            state.shop.followers = shopFollowers.filter(fl => fl !== userId);
          }
        },
      )
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

export const {setShops, setShopModal} = shopSlice.actions;

export default shopSlice.reducer;
