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

interface InitialData {
  phone: string;
  password: string;
}

const InitialError = {
  phone: '',
  password: '',
};

export default function Login() {
  const [data, setData] = useState<InitialData>({phone: '', password: ''});
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [errorText, setErrorText] = useState<InitialData>(InitialError);

  const {isLoading} = useAppSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    let err = false;
    if (data.phone === '') {
      setErrorText(prev => ({...prev, phone: 'Bạn chưa nhập số điện thoại'}));
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
        navigation.navigate('Home');
      })
      .catch((err: any) => {
        err?.errors &&
          err.errors.forEach((e: any) => {
            switch (e.path) {
              case 'phone':
                setErrorText(prev => ({
                  ...prev,
                  phone: e.msg,
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

  return (
    <View>
      <Header
        barStyle="light-content"
        backgroundColor={mainColor}
        leftComponent={
          <Icon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            color={'white'}
          />
        }
        rightComponent={
          <Icon
            name="home"
            color={'white'}
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
          <View style={styles.form}>
            <FieldInput
              icon="phone"
              label="Số điện thoại"
              placeholder="Số điện thoại"
              type="numeric"
              value={data.phone}
              setValue={phone => setData({...data, phone})}
              isPasswordShow={false}
              setIsPasswordShow={setIsPasswordShow}
              errorMsg={errorText.phone}
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

          <View style={styles.socials}>
            <SocialIcon type="facebook" />
            <SocialIcon type="google" />
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

  register: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
});
