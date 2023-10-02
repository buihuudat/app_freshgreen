import {StyleSheet} from 'react-native';
import {mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {flex: 1},

  top: {
    flex: 0.2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatar: {
    width: 100,
    height: 100,
    borderWidth: 5,
    borderColor: mainColor,
    borderRadius: 100,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    borderRadius: 100,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editBtn: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#999',
    opacity: 0.5,
    width: '100%',
  },

  fullname: {
    fontSize: 22,
    fontWeight: '600',
  },
  following: {},

  bottom: {
    flex: 0.8,
    elevation: 10,
    shadowColor: mainColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },

  formName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonActions: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    width: '40%',
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },

  btnText: {
    fontWeight: '600',
    fontSize: 22,
    textAlign: 'center',
    padding: 10,
    color: 'white',
  },

  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: '100%',
    width: '100%',
    color: 'black',
    flex: 1,
  },

  address: {
    paddingBottom: 30,
  },

  selectItem: {
    borderWidth: 1,
  },
});
