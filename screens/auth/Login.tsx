import React, {useState} from 'react';
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
import {Card, Header, Icon, SocialIcon} from '@rneui/themed';
import {Image} from 'react-native';
import FieldInput from '../../components/FieldInput';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {authActions} from '../../actions/authActions';
import {RootState} from '../../redux/store';
import {checkAuth} from '../../utils/handlers/checkAuth';
import {facebookLogin} from '../../utils/handlers/facebookLogin';
import {googleLogin} from '../../utils/handlers/googleLogin';

interface InitialData {
  username: string;
  password: string;
}

const InitialError = {
  username: '',
  password: '',
};

export default function Login() {
  const [data, setData] = useState<InitialData>({username: '', password: ''});
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [errorText, setErrorText] = useState<InitialData>(InitialError);
  const [showForm2, setShowForm2] = useState({
    show: false,
    message: '',
    email: '',
  });

  const {isLoading} = useAppSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    let err = false;
    if (data.username === '') {
      setErrorText(prev => ({...prev, username: 'Yêu cầu nhập đủ thông tin'}));
      err = true;
    }
    if (data.password === '') {
      setErrorText(prev => ({...prev, password: 'Bạn chưa nhập số mật khẩu'}));
      err = true;
    }

    if (err) return;
    setErrorText(InitialError);

    await dispatch(authActions.login(data))
      .unwrap()
      .then(() => {
        checkAuth(dispatch);
        navigation.navigate('HomeTab');
      })
      .catch((err: any) => {
        err?.errors &&
          err.errors.forEach((e: any) => {
            switch (e.path) {
              case 'username':
                setErrorText(prev => ({
                  ...prev,
                  username: e.msg,
                }));
                break;
              case 'password':
                setErrorText(prev => ({
                  ...prev,
                  password: e.msg,
                }));
                break;
              default:
                break;
            }
          });
      });
  };

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
          setShowForm2({
            show: true,
            message: error.message,
            email: data.email,
          });
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
          setShowForm2({
            show: true,
            message: error.message,
            email: data.email,
          });
        }
      });
  };

  const handleSMSLogin = () => {
    navigation.navigate('LoginWithSMS');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

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
          <Text style={styles.title}>Đăng nhập</Text>

          {!showForm2.show ? (
            <View style={styles.form}>
              <FieldInput
                icon="person"
                label="Tài khoản/ Số điện thoại/ Email"
                placeholder="Tài khoản/ Số điện thoại/ Email"
                type="default"
                value={data.username}
                setValue={username => setData({...data, username})}
                isPasswordShow={false}
                setIsPasswordShow={setIsPasswordShow}
                errorMsg={errorText.username}
              />
              <FieldInput
                icon="key"
                label="Mật khẩu"
                placeholder="Mật khẩu"
                value={data.password}
                setValue={password => setData({...data, password})}
                isPasswordShow={isPasswordShow}
                setIsPasswordShow={setIsPasswordShow}
                secure
                errorMsg={errorText.password}
              />

              <Text onPress={handleForgotPassword} style={styles.forgotPass}>
                Quên mật khẩu?
              </Text>

              <View style={{paddingVertical: 5}}>
                {isLoading ? (
                  <ActivityIndicator color={mainColor} />
                ) : (
                  <Button
                    onPress={handleLogin}
                    title="Đăng nhập"
                    color={mainColor}
                  />
                )}
              </View>

              <Card.Divider style={{paddingVertical: 10}}>
                <Text style={{textAlign: 'center'}}>Hoặc đăng nhập bằng</Text>
              </Card.Divider>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.form2Message}>{showForm2.message}</Text>
              <FieldInput
                icon="person"
                label="Email"
                placeholder="Email"
                type="email-address"
                value={showForm2.email || data.username}
                setValue={username => setData({...data, username})}
                isPasswordShow={false}
                setIsPasswordShow={setIsPasswordShow}
                errorMsg={errorText.username}
              />
              <FieldInput
                icon="key"
                label="Mật khẩu"
                placeholder="Mật khẩu"
                value={data.password}
                setValue={password => setData({...data, password})}
                isPasswordShow={isPasswordShow}
                setIsPasswordShow={setIsPasswordShow}
                secure
                errorMsg={errorText.password}
              />

              <Text onPress={handleForgotPassword} style={styles.forgotPass}>
                Quên mật khẩu?
              </Text>

              <View style={{paddingVertical: 5}}>
                {isLoading ? (
                  <ActivityIndicator color={mainColor} />
                ) : (
                  <Button
                    onPress={handleLogin}
                    title="Đăng nhập"
                    color={mainColor}
                  />
                )}
              </View>

              <Card.Divider style={{paddingVertical: 10}}>
                <Text style={{textAlign: 'center'}}>Hoặc đăng nhập bằng</Text>
              </Card.Divider>
            </View>
          )}

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
            <Icon onPress={handleSMSLogin} name="sms" color="#999" size={32} />
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
}

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
