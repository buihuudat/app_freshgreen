import {StyleSheet} from 'react-native';
import {mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storeInformation: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  storeName: {
    textTransform: 'capitalize',
    fontSize: 25,
    fontWeight: '600',
  },
  followers: {
    paddingTop: 10,
    color: mainColor,
  },

  // details
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
  },
  bio: {textAlign: 'center', fontStyle: 'italic'},

  // products
  products: {
    flex: 1,
  },
  productTitle: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
  },
  list: {
    padding: 20,
  },
});
