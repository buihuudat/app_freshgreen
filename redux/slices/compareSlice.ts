import {createSlice} from '@reduxjs/toolkit';
import {ProductType} from '../../types/productType';
import Toast from 'react-native-toast-message';

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
        return Toast.show({type: 'warning', text1: 'Sản phẩm đã tồn tại'});
      }
      if (state.products.length >= 6) {
        return Toast.show({type: 'warning', text1: 'Đã vượt quá số lượng'});
      }
      state.products.push(action.payload);
      Toast.show({
        type: 'success',
        text1: `Đã thêm ${action.payload.title} vào mục so sánh`,
      });
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
