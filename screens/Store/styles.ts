import {StyleSheet} from 'react-native';
import {mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  storeList: {
    flexGrow: 1,
    alignItems: 'center',
  },

  storeItem: {
    width: '40%',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
  },

  title: {
    textTransform: 'capitalize',
    paddingTop: 5,
    fontSize: 20,
    color: mainColor,
  },
});
