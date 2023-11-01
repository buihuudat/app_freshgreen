import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const googleLogin = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  const result = auth().signInWithCredential(googleCredential);

  const user = (await result)?.user;

  const data = {
    googleId: (await result).user.uid,
    fullname: {
      firstname: '',
      lastname: user.displayName!,
    },
    email: user.email!,
    avatar: user.photoURL,
    phone: 'social#' + user.uid,
    username:
      user.email?.split('@')[0]! + user.uid.substring(user.uid.length - 4)!,
    password: user.uid,
  };

  return data;
};
