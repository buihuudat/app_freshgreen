import {StyleSheet} from 'react-native';
import {mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {flex: 1},

  bill: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    margin: 20,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },

  topBill: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateText: {
    textTransform: 'capitalize',
    fontStyle: 'italic',
  },

  billTitle: {
    fontWeight: '700',
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 20,
    color: '#000',
  },

  billItem: {
    isplay: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },

  billTextItem: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },

  billInfoItem: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  billPriceItem: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  textPay: {
    fontSize: 22,
    fontWeight: '600',
  },
  textPricePay: {
    fontSize: 30,
    fontWeight: '600',
    color: mainColor,
  },

  btn: {
    marginTop: 'auto',
    backgroundColor: mainColor,
    padding: 10,
    margin: 30,
    borderRadius: 5,
    elevation: 5,
  },

  textBtn: {
    fontWeight: '600',
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
});
