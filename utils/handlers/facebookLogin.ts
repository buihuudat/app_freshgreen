import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

export const facebookLogin = async () => {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  const dataResult = auth().signInWithCredential(facebookCredential);
  const user = (await dataResult)?.user;

  const dataReturn = {
    facebookId: user.uid,
    fullname: {
      firstname:
        (await dataResult).additionalUserInfo?.profile?.first_name || '',
      lastname:
        (await dataResult).additionalUserInfo?.profile?.last_name ||
        user.displayName,
    },
    email: user.email,
    avatar: user.photoURL,
    phone: 'social#' + user.uid,
    username:
      user.email?.split('@')[0]! + user.uid.substring(user.uid.length - 4)!,
    password: user.uid,
  };

  return dataReturn;
};
