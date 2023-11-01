import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  reveicerInfor: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  reveicerName: {
    fontSize: 20,
    fontWeight: '600',
  },

  // actions
  actionContainer: {
    marginTop: 'auto',
    padding: 5,
  },
  actionWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputAction: {
    width: '80%',
  },
});
