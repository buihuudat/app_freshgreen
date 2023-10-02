import {StyleSheet} from 'react-native';
import {mainColor} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {},

  account: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },

  inLogin: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'flex-start',
    width: '100%',
  },

  accountLogin: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  loginImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 50,
  },

  btns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },

  btnLogin: {
    padding: 10,
    backgroundColor: mainColor,
    borderRadius: 5,
  },
  textLogin: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
  btnRegister: {
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderColor: mainColor,
    borderWidth: 2,
  },
  textRegister: {
    fontWeight: '600',
    fontSize: 16,
    color: mainColor,
  },

  userInfor: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  userInforName: {
    width: '60%',
  },
  fullname: {
    fontWeight: '600',
    fontSize: 30,
  },

  username: {
    fontStyle: 'italic',
    fontWeight: '600',
    paddingHorizontal: 5,
    borderRadius: 10,
    borderColor: mainColor,
    borderWidth: 2,
    alignSelf: 'flex-start',
  },

  userFollow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  followText: {
    fontWeight: '600',
  },

  userInfoIitem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  viewTotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  total: {
    padding: 10,
    width: '50%',
  },
  totalTitle: {
    textAlign: 'center',
    fontSize: 16,
  },
  totalSubtitle: {
    fontSize: 25,
    fontWeight: '600',
    color: mainColor,
    textAlign: 'center',
  },

  actions: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 30,
    paddingHorizontal: 40,
    gap: 10,
  },
});
