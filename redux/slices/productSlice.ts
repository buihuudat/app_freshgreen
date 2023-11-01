import {createSlice} from '@reduxjs/toolkit';
import {InitialProduct, ProductType} from '../../types/productType';
import {productActions} from '../../actions/productActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';

interface InitialStateProps {
  products: Array<ProductType>;
  product: ProductType;
  popular: Array<ProductType>;
  productsView: Array<ProductType>;
  bestSeller: Array<ProductType>;
  shopProducts: {
    products: ProductType[];
    totalProducts: number;
  };
  totalProducts: number;
  loading: boolean;
  productLoading: boolean;
  modal: {
    data?: ProductType;
    open: boolean;
  };
  category: string | null;
}

const initialState: InitialStateProps = {
  products: [],
  product: InitialProduct,
  popular: [],
  productsView: [],
  bestSeller: [],
  shopProducts: {products: [], totalProducts: 0},
  totalProducts: 0,
  loading: false,
  productLoading: true,

  modal: {
    data: undefined,
    open: false,
  },
  category: null,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductModal: (state, action) => {
      state.modal = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(productActions.gets.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = action.payload?.products;
          state.totalProducts = action.payload?.totalProducts;
        }
      })
      .addCase(productActions.get.fulfilled, (state, action) => {
        state.product = action.payload;
        state.productLoading = false;
      })
      .addCase(productActions.popular.fulfilled, (state, action) => {
        state.popular = action.payload;
      })
      .addCase(productActions.bestSeller.fulfilled, (state, action) => {
        state.bestSeller = action.payload;
      })
      .addCase(productActions.getProductsView.fulfilled, (state, action) => {
        state.productsView = action.payload;
      })
      .addCase(productActions.getShopProducts.fulfilled, (state, action) => {
        state.shopProducts = action.payload;
      })
      .addCase(productActions.updateProductView.fulfilled, (state, action) => {
        if (!action.payload) return;
        const indexProduct = state.products.findIndex(
          product => product._id === action.meta.arg,
        );
        const currentProduct = state.products[indexProduct];
        state.products[indexProduct] = {
          ...currentProduct,
          views: currentProduct.views + 1,
        };
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

export const {setProductModal, setCategory} = productSlice.actions;
export default productSlice.reducer;
