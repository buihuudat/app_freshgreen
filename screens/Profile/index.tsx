import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Header, Icon, LinearProgress} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import {styles} from './style';
import {UserType, fullnameOfUser} from '../../types/userType';
import FieldInput from '../../components/FieldInput';
import {TouchableOpacity} from 'react-native';
import FormAddress from './components/FormAddress';
import {userActions} from '../../actions/userActions';
import AvatarUser from './components/AvatarUser';
import ModalHandler from './components/ModalHandler';

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

export interface AddressProps {
  city: string;
  district: string;
  ward: string;
  street: string;
  more: string;
  [key: string]: string;
}

const Profile = () => {
  const {isLoading, user} = useAppSelector((state: RootState) => state.user);
  const initialAddress = {
    city: user?.address?.city || '',
    district: user?.address?.district || '',
    ward: user?.address?.ward || '',
    street: user?.address?.street || '',
    more: user?.address?.more || '',
  };
  const [data, setData] = useState<UserType>({
    ...user!,
    password: '' as string,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(true);
  const [isCfPasswordShow, setIsCfPasswordShow] = useState(true);
  const [errorText, setErrorText] = useState<InitialData>(InitialData);
  const [address, setAddress] = useState<AddressProps>(
    initialAddress || user?.address,
  );
  const [openModal, setOpenModal] = useState(false);

  const [edit, setEdit] = useState(false);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    setEdit(false);
    setData(user!);
    setAddress(initialAddress);
  };

  const handleEdit = () => {
    const newData = {...data, address};

    let err: boolean = false;

    if (
      newData.fullname.firstname.length > 8 ||
      newData.fullname.firstname.length < 2
    ) {
      setErrorText(prev => ({
        ...prev,
        fullname: {...prev.fullname, firstname: 'Họ không hợp lệ'},
      }));
      err = true;
    }
    if (
      newData.fullname.lastname.length > 8 ||
      newData.fullname.lastname.length < 3
    ) {
      setErrorText(prev => ({
        ...prev,
        fullname: {...prev.fullname, lastname: 'Tên không hợp lệ'},
      }));
      err = true;
    }
    if (
      newData.phone.length < 10 ||
      newData.phone.length > 11 ||
      !/^[0-9]+$/.test(newData.phone)
    ) {
      setErrorText(prev => ({...prev, phone: 'Số điện thoại không hợp lệ'}));
      err = true;
    }

    if (newData.email === '') {
      setErrorText(prev => ({
        ...prev,
        email: 'Bạn chưa nhập email',
      }));
      err = true;
    }

    if (newData.username.length < 6 || newData.username.length > 50) {
      setErrorText(prev => ({
        ...prev,
        username: 'Tên tài khoản không hợp lệ',
      }));
      err = true;
    }
    if (newData.password !== confirmPassword) {
      setErrorText(prev => ({
        ...prev,
        confirmPassword: 'Mật khâu không khớp',
      }));
      err = true;
    }

    if (err) return;
    setErrorText(InitialData);

    dispatch(userActions.userUpdate(data))
      .unwrap()
      .then(() => {
        setEdit(false);
      })
      .catch((err: any) => {
        err?.errors &&
          err?.errors?.forEach((e: any) => {
            switch (e.path) {
              case 'fullname.firstname':
                setErrorText(prev => ({
                  ...prev,
                  firstname: e.msg,
                }));
                break;
              case 'fullname.lastname':
                setErrorText(prev => ({
                  ...prev,
                  lastname: e.msg,
                }));
                break;
              case 'username':
                setErrorText(prev => ({
                  ...prev,
                  username: e.msg,
                }));
                break;
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
    <View style={styles.container}>
      <Header
        backgroundColor={'transparent'}
        barStyle="dark-content"
        leftComponent={
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            color={mainColor}
          />
        }
        rightComponent={
          <Icon
            onPress={() => setEdit(!edit)}
            name="drive-file-rename-outline"
            color={mainColor}
          />
        }
      />
      <View style={styles.content}>
        <View style={styles.top}>
          {isLoading && <LinearProgress color={mainColor} />}

          <AvatarUser user={user!} setOpenModal={setOpenModal} />

          <Text style={styles.fullname}>{fullnameOfUser(user?.fullname!)}</Text>
          <Text style={styles.following}>
            Đang theo dõi: {user?.following?.length}
          </Text>
        </View>

        <View style={styles.bottom}>
          <ScrollView
            style={{
              padding: 20,
            }}>
            <View style={styles.formName}>
              <FieldInput
                icon="badge"
                label="Họ"
                placeholder="Nhập họ"
                type="default"
                value={data.fullname.firstname}
                disable={edit}
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
                disable={edit}
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
              disable={edit}
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
              disable={edit}
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
              disable={edit}
            />

            {edit && (
              <FieldInput
                icon="key"
                label="Mật khẩu"
                placeholder="******"
                value={data.password as string}
                setValue={password => setData({...data, password})}
                secure
                isPasswordShow={isPasswordShow}
                setIsPasswordShow={setIsPasswordShow}
                errorMsg={errorText.password}
                disable={edit}
              />
            )}
            {edit && (
              <FieldInput
                icon="key"
                label="Xác minh mật khẩu"
                placeholder="******"
                value={confirmPassword}
                secure
                setValue={confirmPassword =>
                  setConfirmPassword(confirmPassword)
                }
                isPasswordShow={isCfPasswordShow}
                setIsPasswordShow={setIsCfPasswordShow}
                errorMsg={errorText.confirmPassword}
                disable={edit}
              />
            )}
            <FormAddress
              edit={edit}
              dataProps={address}
              setDataProps={setAddress}
            />

            {edit && (
              <View style={styles.buttonActions}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={{...styles.btn, backgroundColor: 'orange'}}>
                  <Text style={styles.btnText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  disabled={isLoading}
                  onPress={handleEdit}
                  style={{...styles.btn, backgroundColor: mainColor}}>
                  <Text style={styles.btnText}>Hoàn tất</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <ModalHandler open={openModal} setOpen={setOpenModal} user={user!} />
    </View>
  );
};

export default Profile;
