import {StyleSheet} from 'react-native';
import {mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  inputSubContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: mainColor,
    paddingHorizontal: 10,
    width: '100%',
  },
  inputText: {
    fontWeight: '600',
    fontSize: 18,
    padding: 3,
  },

  productItem: {
    padding: 10,
    margin: 10,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: 'white',

    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  imageProductItem: {
    width: 50,
    height: 50,
  },
  titleProductItem: {
    fontWeight: '600',
    fontSize: 20,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  itemContent: {
    flexGrow: 1,
    alignItems: 'flex-start',
    maxWidth: '50%',
  },

  price: {
    fontSize: 25,
    color: mainColor,
    fontWeight: '600',
  },
});
