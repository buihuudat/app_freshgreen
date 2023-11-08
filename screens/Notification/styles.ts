import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  notificationIcon: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  textItem: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
  },
  date: {
    position: 'absolute',
    right: 5,
    top: 0,
    fontStyle: 'italic',
  },
});
