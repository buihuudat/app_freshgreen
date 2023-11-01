import {StyleSheet} from 'react-native';
import {mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 5,
    flex: 1,
  },
  orderTime: {
    textTransform: 'capitalize',
    fontStyle: 'italic',
  },

  productList: {
    overflow: 'scroll',
  },

  orderProductItem: {
    margin: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  orderProductItemImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  orderProductItemTitle: {
    fontWeight: '600',
    fontSize: 18,
  },

  titleQuantity: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  quantityPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textPrice: {
    fontWeight: '600',
    fontSize: 20,
    color: mainColor,
  },

  orderInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  orderInfoText: {
    fontSize: 20,
    fontWeight: '600',
  },
  orderInfoPrice: {
    fontWeight: '600',
    fontSize: 22,
    color: mainColor,
  },

  text: {
    textAlign: 'center',
    fontWeight: '600',
    padding: 10,
    fontSize: 18,
  },
  btnPending: {
    padding: 10,
    backgroundColor: '#999',
    borderRadius: 5,
  },
  btnTextPending: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
  },

  accessText: {
    textAlign: 'center',
    fontWeight: '600',
    padding: 10,
    color: 'white',
    fontSize: 18,
  },
  btnAccess: {
    backgroundColor: mainColor,
    borderRadius: 5,
    elevation: 5,
  },

  formRefure: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  textRefure: {
    fontStyle: 'italic',
    fontSize: 18,
    color: '#F9455B',
  },
});
