import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}

GoogleSignin.configure({
  webClientId:
    '695374466102-ulj93qlbks4iuigo7eaql0eohetcmglc.apps.googleusercontent.com',
});

AppRegistry.registerComponent(appName, () => HeadlessCheck);
