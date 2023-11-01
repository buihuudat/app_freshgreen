import {createSlice} from '@reduxjs/toolkit';
import {voucherActions} from '../../actions/voucherActions';
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from '../../types/silceType';
import {VoucherType, initialVoucher} from '../../types/voucherType';

interface InitialStateProps {
  vouchers: Array<VoucherType>;
  voucher: VoucherType;
  loading: boolean;
}

const initialState: InitialStateProps = {
  vouchers: [],
  voucher: initialVoucher,
  loading: false,
};

export const voucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(voucherActions.gets.fulfilled, (state, action) => {
        state.vouchers = action.payload;
      })
      .addCase(voucherActions.get.fulfilled, (state, action) => {
        state.voucher = action.payload;
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

export default voucherSlice.reducer;
