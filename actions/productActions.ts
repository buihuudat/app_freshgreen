import {createAsyncThunk} from '@reduxjs/toolkit';
import {productApi} from '../utils/api/productApi';
import {PaginationType} from '../types/dataTypes';

export const productActions = {
  gets: createAsyncThunk(
    'product/gets',
    async (pagination?: PaginationType) => {
      try {
        const res = await productApi.gets(pagination);
        // await dataStorage.setItem('product', res.data);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  ),

  get: createAsyncThunk('product/get', async (productId: string) => {
    try {
      const res = await productApi.get(productId);
      return res.data;
    } catch (error: any) {
      throw error;
    }
  }),

  popular: createAsyncThunk('product/popular', async () => {
    try {
      const res = await productApi.getPopularProducts();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  bestSeller: createAsyncThunk('product/best-seller', async () => {
    try {
      const res = await productApi.getProductsBestSeller();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  getShopProducts: createAsyncThunk(
    'product/getShopProducts',
    async (id: string) => {
      try {
        const res = await productApi.shopProducts(id);
        return res.data;
      } catch (error: any) {
        throw error;
      }
    },
  ),

  getProductsView: createAsyncThunk('product/prouduct-view', async () => {
    try {
      const res = await productApi.getProductsView();
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  searchProducts: createAsyncThunk(
    'product/search',
    async (searchQuery: string) => {
      try {
        const res = await productApi.searchProducts(searchQuery);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  ),

  updateProductView: createAsyncThunk(
    'product/update/view',
    async (productId: string) => {
      try {
        await productApi.updateView(productId);
        return true;
      } catch (error) {
        return false;
      }
    },
  ),
};
