import {createAsyncThunk} from '@reduxjs/toolkit';
import {productApi} from '../utils/api/productApi';
import {ProductType} from '../types/productType';
import {PaginationType} from '../types/dataTypes';
import {dataStorage} from '../utils/handlers/dataStorage';

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

  create: createAsyncThunk(
    'product/create',
    async (newProduct: ProductType, thunkAPI) => {
      try {
        const res = await productApi.create(newProduct);
        return res.data;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    },
  ),

  update: createAsyncThunk(
    'product/update',
    async (newProduct: ProductType, thunkAPI) => {
      try {
        const res = await productApi.update(newProduct);
        return res.data;
      } catch (error: any) {
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    },
  ),

  delete: createAsyncThunk('product/delete', async (product: ProductType) => {
    try {
      await productApi.delete(product);
      return true;
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
};
