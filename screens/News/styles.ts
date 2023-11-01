import {StyleSheet} from 'react-native';
import {black, mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tags: {},

  textTag: {
    fontSize: 18,
    fontWeight: '600',
    color: black,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: mainColor,
    marginLeft: 10,
  },

  newsList: {
    width: 'auto',
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
  },

  newsItem: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },

  newsContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: mainColor,
  },
  contentUser: {
    display: 'flex',
    flexDirection: 'column',
  },

  user: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  userImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  userText: {
    fontSize: 18,
    fontWeight: '600',
  },

  newsInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
  },
  newsInfoText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
