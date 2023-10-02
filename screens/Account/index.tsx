import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useMemo} from 'react';
import {Divider} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {useAppSelector} from '../../redux/hooks';
import {UserImage} from '../../constants/images';
import {fullnameOfUser} from '../../types/userType';
import {styles} from './style';
import SelectItem from './components/SelectItem';
import {moneyFormat} from '../../utils/handlers/moneyFormat';
import {dataAction} from './data';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootState} from '../../redux/store';
import {OrderStatus} from '../../types/orderType';
import {logout} from '../../utils/handlers/logout';

export default function Account() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const user = useAppSelector((state: RootState) => state.user.user);
  const orders = useAppSelector((state: RootState) => state.order.data);

  const totalPrice = useMemo(() => {
    return orders
      .filter(order => order.status === OrderStatus.done)
      .reduce((inc, ac) => inc + ac.totalPrice, 0);
  }, [orders]);

  const totalOrder = useMemo(() => {
    return orders.filter(order => order.status === OrderStatus.done).length;
  }, [orders]);

  const handleLogout = () => {
    logout().then(() => {
      navigation.navigate('Splash');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent
        barStyle={'dark-content'}
      />

      {/* account */}
      <View style={styles.account}>
        {!user ? (
          <View style={styles.accountLogin}>
            <Image source={UserImage} style={styles.loginImage} />
            <View style={styles.btns}>
              <TouchableOpacity
                style={styles.btnLogin}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textLogin}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnRegister}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.textRegister}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.inLogin}>
            <View style={styles.accountLogin}>
              <Image source={{uri: user.avatar}} style={styles.loginImage} />
              <View style={styles.userInforName}>
                <Text style={styles.fullname}>
                  {fullnameOfUser(user.fullname)}
                </Text>
                <Text style={styles.username}>{user.username}</Text>

                <View style={styles.userFollow}>
                  <View style={styles.userFollow}>
                    <Text style={styles.followText}>Đang theo dõi</Text>
                    <Text>{user.following?.length}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      <ScrollView style={styles.content}>
        <View>
          <Divider width={1} />
          <View style={styles.viewTotal}>
            <View style={styles.total}>
              <Text style={styles.totalTitle}>Số tiền đã chi</Text>
              <Text style={styles.totalSubtitle}>
                {moneyFormat(totalPrice)}
              </Text>
            </View>
            <Divider orientation="vertical" width={1} />
            <View style={styles.total}>
              <Text style={styles.totalTitle}>Tổng đơn hàng</Text>
              <Text style={styles.totalSubtitle}>{totalOrder}</Text>
            </View>
          </View>
          <Divider width={1} />
        </View>

        {/* actions */}
        <View style={styles.actions}>
          {dataAction.map((data, index) => {
            if (data.active || user?._id) {
              return (
                <SelectItem
                  key={index}
                  icon={data.icon}
                  title={data.title}
                  navigation={() => navigation.navigate(data.path)}
                />
              );
            }
          })}
        </View>
        {user && (
          <View>
            <Divider width={2} />
            <View style={{paddingHorizontal: 40}}>
              <SelectItem
                color="red"
                title="Đăng xuất"
                icon="power-settings-new"
                navigation={handleLogout}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
