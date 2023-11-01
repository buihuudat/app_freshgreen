import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LoginBg, Logo} from '../../constants/images';
import {StyleSheet} from 'react-native';
import {Card, Header, Icon} from '@rneui/themed';
import {Image} from 'react-native';
import FieldInput from '../../components/FieldInput';
import {mainColor, info} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {authActions} from '../../actions/authActions';
import {RootState} from '../../redux/store';
import {checkAuth} from '../../utils/handlers/checkAuth';
import {facebookLogin} from '../../utils/handlers/facebookLogin';
import {googleLogin} from '../../utils/handlers/googleLogin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface InitialData {
  phone: string;
  code: string;
}

const InitialError = {
  phone: '',
  code: '',
};

const LoginWithSMS = () => {
  const [data, setData] = useState<InitialData>({phone: '', code: ''});
  const [errorText, setErrorText] = useState<InitialData>(InitialError);
  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState('');

  const {isLoading} = useAppSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  // const handleLogin = async () => {
  //   let err = false;
  //   if (data.phone === '') {
  //     setErrorText(prev => ({...prev, phone: 'Bạn chưa nhập số điện thoại'}));
  //     err = true;
  //   }
  //   if (data.password === '') {
  //     setErrorText(prev => ({...prev, password: 'Bạn chưa nhập số mật khẩu'}));
  //     err = true;
  //   }

  //   if (err) return;
  //   setErrorText(InitialError);

  //   await dispatch(authActions.login(data))
  //     .unwrap()
  //     .then(() => {
  //       checkAuth(dispatch);
  //       navigation.navigate('HomeTab');
  //     })
  //     .catch((err: any) => {
  //       err?.errors &&
  //         err.errors.forEach((e: any) => {
  //           switch (e.path) {
  //             case 'phone':
  //               setErrorText(prev => ({
  //                 ...prev,
  //                 phone: e.msg,
  //               }));
  //               break;
  //             case 'password':
  //               setErrorText(prev => ({
  //                 ...prev,
  //                 password: e.msg,
  //               }));
  //               break;
  //             default:
  //               break;
  //           }
  //         });
  //     });
  // };

  const handleGoogleLogin = async () => {
    const data: any = await googleLogin();
    await dispatch(authActions.facebook(data))
      .unwrap()
      .then(() => {
        checkAuth(dispatch).then(() => {
          navigation.navigate('HomeTab');
        });
      })
      .catch((error: any) => {
        if (error.type === 'email_existed') {
        }
      });
  };

  const handleFacebookLogin = async () => {
    const data: any = await facebookLogin();
    await dispatch(authActions.google(data))
      .unwrap()
      .then(() => {
        checkAuth(dispatch).then(() => {
          navigation.navigate('HomeTab');
        });
      })
      .catch((error: any) => {
        if (error.type === 'email_existed') {
        }
      });
  };

  function onAuthStateChanged(user: any) {
    if (user) {
      console.log('User is signed in:', user);
    } else {
      console.log('User is signed out');
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user =>
      onAuthStateChanged(user as FirebaseAuthTypes.User | null),
    );
    return subscriber;
  }, []);

  const signInWithPhoneNumber = async () => {
    console.log(123);

    const confirmation: any = await auth().signInWithPhoneNumber(
      '+84987651053',
    );
    console.log(confirmation);

    setConfirm(confirmation!);
  };

  async function confirmCode() {
    try {
      confirm && (await confirm.confirm(code));
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <View>
      <Header
        barStyle="dark-content"
        backgroundColor={'transparent'}
        leftComponent={
          <Icon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            color={mainColor}
          />
        }
        rightComponent={
          <Icon
            name="home"
            color={mainColor}
            onPress={() => navigation.navigate('HomeTab')}
          />
        }
      />
      <ImageBackground
        imageStyle={styles.container}
        blurRadius={5}
        source={LoginBg}>
        <Card containerStyle={styles.card}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>Đăng nhập bằng SMS</Text>

          <View style={styles.form}>
            <FieldInput
              icon="person"
              label="Số điện thoại"
              placeholder="Số điện thoại"
              type="numeric"
              value={data.phone}
              setValue={phone => setData({...data, phone})}
              isPasswordShow={false}
              setIsPasswordShow={() => {}}
              errorMsg={errorText.phone}
            />

            {!confirm ? (
              <View style={{paddingVertical: 5, paddingBottom: 10}}>
                <Button
                  title="Phone Number Sign In"
                  onPress={signInWithPhoneNumber}
                />
              </View>
            ) : (
              <View style={{paddingVertical: 5, paddingBottom: 10}}>
                {isLoading ? (
                  <ActivityIndicator color={mainColor} />
                ) : (
                  <Button title="Đăng nhập" color={mainColor} />
                )}
              </View>
            )}
            <Button
              onPress={() => navigation.goBack()}
              title="Đăng nhập bằng tài khoản"
              color={'#999'}
            />

            <Card.Divider style={{paddingVertical: 10}}>
              <Text style={{textAlign: 'center'}}>Hoặc đăng nhập bằng</Text>
            </Card.Divider>
          </View>

          <View style={styles.socials}>
            <Icon
              onPress={handleFacebookLogin}
              name="facebook"
              color={'blue'}
              size={32}
            />
            <Icon
              size={32}
              onPress={handleGoogleLogin}
              type="font-awesome"
              name="google"
              color={'#F4B400'}
            />
          </View>

          <View style={styles.register}>
            <Text style={{fontWeight: '600'}}>Nếu chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.push('Register')}>
              <Text style={{fontWeight: '600', fontSize: 15, color: mainColor}}>
                Đăng ký ngay
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ImageBackground>
    </View>
  );
};

export default LoginWithSMS;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 0.8,
    borderRadius: 5,
    marginTop: 100,
    paddingHorizontal: 0,
  },

  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: '600',
    fontSize: 32,
    textAlign: 'center',
  },

  form: {
    width: 300,
    paddingTop: 20,
  },

  socials: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  forgotPass: {
    fontWeight: '600',
    paddingVertical: 5,
    textAlign: 'right',
  },

  register: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

  form2Message: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
    textAlign: 'center',
    color: 'orange',
  },
});
