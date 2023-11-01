import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {cartActions} from '../../actions/cartActions';
import {CartType, InitialCart, ProductCartType} from '../../types/cartType';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface InitialType {
  data: CartType;
  loading: boolean;
}
const initialState: InitialType = {
  data: InitialCart,
  loading: false,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.data.products = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(cartActions.getCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.data = action.payload;
        }
      })
      // .addCase(cartActions.addProductToCart.fulfilled, state => {})
      // .addCase(cartActions.downCountProduct.fulfilled, state => {})
      // .addCase(cartActions.upCountProduct.fulfilled, state => {})
      // .addCase(cartActions.removeProduct.fulfilled, state => {})

      // add product to cart
      .addMatcher(
        isAnyOf(
          cartActions.addProductToCart.pending,
          cartActions.addProductToCart.rejected,
        ),
        (state, action) => {
          const productsInCart: ProductCartType[] = state.data?.products || [];
          const productAction = action.meta.arg.product;
          const indexProduct = productsInCart.findIndex(
            product => product._id === productAction._id,
          );

          let cartProductUpdate = [...productsInCart];
          // if product existed in cart
          if (indexProduct !== -1) {
            cartProductUpdate[indexProduct] = {
              ...cartProductUpdate[indexProduct],
              count:
                cartProductUpdate[indexProduct].count +
                (action.type === cartActions.addProductToCart.pending.type
                  ? productAction.count
                  : -productAction.count),
            };
          } else {
            cartProductUpdate.push(productAction);
          }
          state.data = {...state.data, products: cartProductUpdate};
        },
      )
      // cart up
      .addMatcher(
        isAnyOf(
          cartActions.upCountProduct.pending,
          cartActions.upCountProduct.rejected,
        ),
        (state, action) => {
          const updatedProducts = state.data.products.map(product => {
            if (product._id === action.meta.arg.productId) {
              return {
                ...product,
                count:
                  product.count +
                  (action.type === cartActions.upCountProduct.pending.type
                    ? 1
                    : -1),
              };
            }
            return product;
          });

          const updatedCart = {
            ...state.data,
            products: updatedProducts,
          };
          return {
            ...state,
            data: updatedCart,
          };
        },
      )
      // cart down
      .addMatcher(
        isAnyOf(
          cartActions.downCountProduct.pending,
          cartActions.downCountProduct.rejected,
        ),
        (state, action) => {
          const indexProduct = state.data.products.findIndex(
            product => product._id === action.meta.arg.productId,
          );
          let currentProduct = {...state.data.products[indexProduct]};
          currentProduct = {
            ...currentProduct,
            count:
              currentProduct.count -
              (action.type === cartActions.downCountProduct.pending.type
                ? 1
                : -1),
          };
          if (currentProduct.count > 0) {
            state.data.products[indexProduct] = currentProduct;
          } else {
            state.data.products.splice(indexProduct, 1);
          }
        },
      )
      // remove cart
      .addMatcher(
        isAnyOf(
          cartActions.removeProduct.pending,
          cartActions.removeProduct.rejected,
        ),
        (state, action) => {
          const productIdToRemove = action.meta.arg.productId;
          if (action.type === cartActions.removeProduct.pending.type) {
            state.data.products = state.data.products.filter(
              product => product._id !== productIdToRemove,
            );
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

export const {clearCart} = cartSlice.actions;
export default cartSlice.reducer;
