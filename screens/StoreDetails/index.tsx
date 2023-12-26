import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {Dialog, Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {Store} from '../../constants/images';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import {shopActions} from '../../actions/shopActions';
import {styles} from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Details from './components/Details';
import Products from './components/Products';
import {productActions} from '../../actions/productActions';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'StoreDetails'>;
const Tab = createMaterialTopTabNavigator();

export default function StoreDetails({route, navigation}: Props) {
  const {storeId} = route.params;
  const {shop} = useAppSelector((state: RootState) => state.shop);
  const user = useAppSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  const isFollowing = shop.followers?.findIndex(fl => fl === user?._id!) !== -1;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getStore = async () => {
      await Promise.all([
        dispatch(shopActions.get(storeId)),
        dispatch(productActions.getShopProducts(storeId)),
      ]);
      setIsLoading(false);
    };
    getStore();
  }, [dispatch]);

  const avatar = useMemo(() => {
    if (shop.user && shop.user.avatar) {
      return {uri: shop.user.avatar};
    }
    return Store;
  }, [shop.user]);

  const handleViewFollow = () => {
    setVisible(true);
    setIsLoading(false);
  };
  const handleFollow = () => {
    if (!user) return Toast.show({type: 'error', text1: 'Bạn chưa đăng nhập'});
    dispatch(shopActions.updateFollow({shopId: shop._id!, userId: user?._id!}));
  };

  const handleChat = () => {
    // navigation.navigate('Chat', {
    //   from: {
    //     _id: shop._id!,
    //     avatar: shop.user?.avatar!,
    //     fullname: shop.name,
    //   },
    // });
    Toast.show({type: 'warning', text1: 'Chức năng đang phát triển'});
  };

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="transparent"
        barStyle="dark-content"
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<Icon name="report-gmailerrorred" color={'#FAE600'} />}
      />
      {isLoading ? (
        <ActivityIndicator color={mainColor} />
      ) : (
        <View style={{flex: 1}}>
          <View>
            <View style={styles.storeInformation}>
              <Image style={styles.avatar} source={avatar} />
              <View>
                <Text style={styles.storeName}>{shop.name}</Text>
                <View style={styles.followWrap}>
                  <Text style={styles.followers} onPress={handleViewFollow}>
                    Người theo dõi: {shop.followers?.length}
                  </Text>
                  <TouchableOpacity
                    onPress={handleFollow}
                    style={{
                      ...styles.followBtn,
                      backgroundColor: isFollowing ? '#999' : mainColor,
                    }}>
                    <Text style={styles.followBtnText}>
                      {isFollowing ? 'Bỏ Theo dõi' : 'Theo dõi'}
                    </Text>
                  </TouchableOpacity>
                  <Icon
                    name="chat"
                    color={'#777'}
                    size={25}
                    onPress={handleChat}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Tab.Navigator
              screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: mainColor,
                tabBarPressColor: mainColor,
                tabBarIndicatorStyle: {backgroundColor: mainColor, height: 2},
              }}>
              <Tab.Screen
                name="Chi tiết"
                component={Details}
                options={{
                  tabBarIcon: ({color}) => (
                    <Icon name="info" color={color} size={22} />
                  ),
                }}
              />
              <Tab.Screen
                name="Products"
                component={Products}
                options={{
                  tabBarIcon: ({color}) => (
                    <Icon name="inventory" color={color} size={22} />
                  ),
                }}
              />
            </Tab.Navigator>
          </View>

          <Dialog isVisible={visible} onBackdropPress={() => setVisible(false)}>
            {shop.followers?.length ? (
              <View></View>
            ) : (
              <Text style={styles.textNoFollow}>Chưa có người theo dõi</Text>
            )}
          </Dialog>
        </View>
      )}
    </View>
  );
}
