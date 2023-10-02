import {createSlice} from '@reduxjs/toolkit';
import {ProductType} from '../../types/productType';
import {Alert} from 'react-native';

interface InitialStateProps {
  products: ProductType[];
  isComparing: boolean;
}

const initialState: InitialStateProps = {
  products: [],
  isComparing: false,
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addProductCompare: (state, action) => {
      if (state.products.some(product => product._id === action.payload._id)) {
        Alert.alert('Sản phẩm đã tồn tại');
        return;
      }
      if (state.products.length >= 6) {
        Alert.alert('Đã vượt quá số lượng');
        return;
      }
      state.products.push(action.payload);
      Alert.alert(`Đã thêm ${action.payload.title} vào mục so sánh`);
    },
    removeProductCompare: (state, action) => {
      state.products = state.products.filter(
        product => product._id !== action.payload,
      );
    },
    checkCompare: (state, action) => {
      state.isComparing = state.products.some(
        product => product._id === action.payload,
      );
    },
  },
});

export const {addProductCompare, removeProductCompare, checkCompare} =
  compareSlice.actions;
export default compareSlice.reducer;
