import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {Store} from '../../constants/images';
import {ShopType} from '../../types/shopType';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import {shopActions} from '../../actions/shopActions';
import {styles} from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Details from './components/Details';
import Products from './components/Products';
import {productActions} from '../../actions/productActions';

type Props = NativeStackScreenProps<RootStackParamList, 'StoreDetails'>;
const Tab = createMaterialTopTabNavigator();

export default function StoreDetails({route, navigation}: Props) {
  const {storeId} = route.params;
  const {shop, loading} = useAppSelector((state: RootState) => state.shop);

  const dispatch = useAppDispatch();
  const getStore = async () => {
    await Promise.all([
      dispatch(shopActions.get(storeId)),
      dispatch(productActions.getShopProducts(storeId)),
    ]);
  };

  useEffect(() => {
    getStore();
  }, []);

  const avatar = useMemo(() => {
    if (shop.user && shop.user.avatar) {
      return {uri: shop.user.avatar};
    }
    return Store;
  }, [shop.user]);

  const handleViewFollow = () => {};

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
      {loading && <ActivityIndicator color={mainColor} />}
      <View>
        <View style={styles.storeInformation}>
          <Image style={styles.avatar} source={avatar} />
          <View>
            <Text style={styles.storeName}>{shop.name}</Text>
            <Text style={styles.followers} onPress={handleViewFollow}>
              Người theo dõi: {shop.followers?.length}
            </Text>
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
    </View>
  );
}
