import {StyleSheet} from 'react-native';
import {mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabScroll: {maxHeight: 45},
  tab: {},

  tabIndicator: {
    backgroundColor: mainColor,
    height: 3,
  },

  tabItem: {},

  tabItemText: {
    fontWeight: '600',
    fontSize: 20,
    minWidth: 60,
    height: 40,
    textAlign: 'center',
    textTransform: 'capitalize',
  },

  productList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
