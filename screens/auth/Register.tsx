import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LoginBg, Logo} from '../../constants/images';
import {StyleSheet} from 'react-native';
import {Card, Header, Icon} from '@rneui/themed';
import {Image} from 'react-native';
import FieldInput from '../../components/FieldInput';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import KeyboardScroll from '../../components/KeyboardScroll';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {authActions} from '../../actions/authActions';
import {RootState} from '../../redux/store';
import {checkAuth} from '../../utils/handlers/checkAuth';

interface InitialData {
  fullname: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const InitialData = {
  fullname: {
    firstname: '',
    lastname: '',
  },
  phone: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const [data, setData] = useState<InitialData>(InitialData);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isCfPasswordShow, setIsCfPasswordShow] = useState(false);
  const [errorText, setErrorText] = useState<InitialData>(InitialData);
  const [show, setShow] = useState(false);

  const {isLoading} = useAppSelector((state: RootState) => state.user);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handleNext = () => {
    setErrorText(InitialData);

    let err = false;

    if (
      data.fullname.firstname.length > 8 ||
      data.fullname.firstname.length < 2 ||
      !/^[a-z]+$/i.test(data.fullname.firstname)
    ) {
      setErrorText(prev => ({
        ...prev,
        fullname: {...prev.fullname, firstname: 'Họ không hợp lệ'},
      }));
      err = true;
    }
    if (
      data.fullname.lastname.length > 8 ||
      data.fullname.lastname.length < 3 ||
      !/^[a-z]+$/i.test(data.fullname.lastname)
    ) {
      setErrorText(prev => ({
        ...prev,
        fullname: {...prev.fullname, lastname: 'Tên không hợp lệ'},
      }));
      err = true;
    }
    if (
      data.phone.length < 10 ||
      data.phone.length > 11 ||
      !/^[0-9]+$/.test(data.phone)
    ) {
      setErrorText(prev => ({...prev, phone: 'Số điện thoại không hợp lệ'}));
      err = true;
    }

    if (data.email === '') {
      setErrorText(prev => ({
        ...prev,
        email: 'Bạn chưa nhập email',
      }));
    }

    if (data.username.length < 6 || data.username.length > 50) {
      setErrorText(prev => ({
        ...prev,
        username: 'Tên tài khoản không hợp lệ',
      }));
    }

    if (err) return;
    setShow(!show);
  };

  const handleSubmit = async () => {
    let err = false;
    if (data.password.length < 8 || data.password.length > 50) {
      setErrorText(prev => ({
        ...prev,
        password: 'Mật khẩu yêu cầu tối thiểu là 8 kí tự',
      }));
      err = true;
    }
    if (data.password !== data.confirmPassword) {
      setErrorText(prev => ({
        ...prev,
        confirmPassword: 'Mật khẩu không khớp',
      }));
      err = true;
    }

    setErrorText(InitialData);
    if (err) return;

    await dispatch(authActions.register(data))
      .unwrap()
      .then(() => {
        checkAuth(dispatch);
        navigation.navigate('HomeTab');
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
              case 'email':
                setErrorText(prev => ({
                  ...prev,
                  email: e.msg,
                }));
                break;
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
      <KeyboardScroll>
        <ScrollView>
          <ImageBackground
            imageStyle={styles.container}
            blurRadius={5}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={LoginBg}>
            <Card containerStyle={styles.card}>
              <Image source={Logo} style={styles.logo} />
              <Text style={styles.title}>Đăng ký</Text>
              {!show ? (
                <View style={styles.form}>
                  <View style={styles.formName}>
                    <FieldInput
                      icon="badge"
                      label="Họ"
                      placeholder="Nhập họ"
                      type="default"
                      value={data.fullname.firstname}
                      setValue={firstname =>
                        setData(prev => ({
                          ...prev,
                          fullname: {...data.fullname, firstname},
                        }))
                      }
                      errorMsg={errorText.fullname.firstname}
                      isPasswordShow={false}
                      setIsPasswordShow={setIsPasswordShow}
                    />
                    <FieldInput
                      icon="badge"
                      label="Tên"
                      placeholder="Nhập tên"
                      type="default"
                      value={data.fullname.lastname}
                      setValue={lastname =>
                        setData(prev => ({
                          ...prev,
                          fullname: {...data.fullname, lastname},
                        }))
                      }
                      isPasswordShow={false}
                      setIsPasswordShow={setIsPasswordShow}
                      errorMsg={errorText.fullname.lastname}
                    />
                  </View>

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
                    icon="email"
                    label="Email"
                    placeholder="Email"
                    type="email-address"
                    value={data.email}
                    setValue={email => setData({...data, email})}
                    isPasswordShow={false}
                    setIsPasswordShow={setIsPasswordShow}
                    errorMsg={errorText.email}
                  />
                  <FieldInput
                    icon="person"
                    label="Tên tài khoản"
                    placeholder="Tên tài khoản"
                    type="default"
                    value={data.username}
                    setValue={username => setData({...data, username})}
                    isPasswordShow={false}
                    setIsPasswordShow={setIsPasswordShow}
                    errorMsg={errorText.username}
                  />

                  <View style={{paddingTop: 10}}>
                    <Button
                      title="Tiếp"
                      color={mainColor}
                      onPress={handleNext}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.form}>
                  <FieldInput
                    icon="key"
                    label="Mật khẩu"
                    placeholder="******"
                    value={data.password}
                    setValue={password => setData({...data, password})}
                    // secure
                    isPasswordShow={isPasswordShow}
                    setIsPasswordShow={setIsPasswordShow}
                    errorMsg={errorText.password}
                  />
                  <FieldInput
                    icon="key"
                    label="Xác minh mật khẩu"
                    placeholder="******"
                    value={data.confirmPassword}
                    setValue={confirmPassword =>
                      setData({...data, confirmPassword})
                    }
                    isPasswordShow={isCfPasswordShow}
                    setIsPasswordShow={setIsCfPasswordShow}
                    errorMsg={errorText.confirmPassword}
                    // secure={true}
                  />
                  <View style={styles.btnGroup}>
                    <View style={{paddingVertical: 5}}>
                      {isLoading ? (
                        <ActivityIndicator color={mainColor} />
                      ) : (
                        <Button
                          title="Đăng ký"
                          color={mainColor}
                          onPress={handleSubmit}
                        />
                      )}
                    </View>
                    <Button
                      title="Quay lại"
                      color={'#888'}
                      onPress={handleNext}
                    />
                  </View>
                </View>
              )}

              <View style={styles.register}>
                <Text style={{fontWeight: '600'}}>Bạn đã có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text
                    style={{fontWeight: '600', fontSize: 15, color: mainColor}}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          </ImageBackground>
        </ScrollView>
      </KeyboardScroll>
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
    width: 350,
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 0.8,
    borderRadius: 5,
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
    paddingTop: 10,
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

  formName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnGroup: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
