import {StyleSheet} from 'react-native';
import {black, mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {flex: 1},

  noProduct: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  productList: {
    flex: 0.5,
    paddingHorizontal: 10,
  },

  cartItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    padding: 10,
    paddingBottom: 20,
  },

  image: {
    elevation: 5,
    zIndex: 5,
    width: 100,
    height: 100,
    backgroundColor: 'white',
  },

  viewTitle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productTitle: {
    fontWeight: '700',
    fontSize: 20,
    width: '60%',
    color: black,
  },

  upDown: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    gap: 10,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#EBFEE0',
  },
  upDownText: {
    fontSize: 20,
    color: mainColor,
    fontWeight: '600',
  },

  price: {
    fontSize: 22,
    fontWeight: '600',
    color: mainColor,
  },

  viewPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bill: {
    flex: 0.5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  billItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    alignItems: 'center',
  },
  billTextItem: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  billTextTotalItem: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  billPriceItem: {
    fontSize: 22,
    fontWeight: '600',
    color: mainColor,
  },
  billDiscountItem: {
    fontSize: 20,
    fontWeight: '600',
    color: 'orange',
  },

  voucher: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 5,
  },
  voucherForm: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    gap: 10,
    paddingVertical: 5,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: 5,
    fontSize: 15,
  },
  btnVoucher: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: mainColor,
    borderRadius: 5,
  },
  textBtn: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },

  btnOrder: {
    padding: 10,
    backgroundColor: mainColor,
    borderRadius: 5,
    elevation: 5,
    marginTop: 10,
  },

  btnTextOrder: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },

  orderLoading: {
    paddingTop: 10,
  },
});
