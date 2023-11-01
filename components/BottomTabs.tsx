import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Avatar, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import Home from '../screens/Home';
import Products from '../screens/Products';
import Account from '../screens/Account';
import Store from '../screens/Store';
import News from '../screens/News';
import Notification from '../screens/Notification';
import {useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';

const Tab = createMaterialBottomTabNavigator();
const iconSize = 28;

export default function BottomTabs() {
  const notificationCount = useAppSelector(
    (state: RootState) => state.notification.notifications,
  ).length;
  const user = useAppSelector((state: RootState) => state.user.user);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={mainColor}
      inactiveColor={'#999'}
      sceneAnimationEnabled={true}
      labeled
      barStyle={{
        height: 70,
        position: 'relative',
        padding: 0,
        margin: 0,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: 'Sản phẩm',
          tabBarIcon: ({color}) => (
            <Icon name="list" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: 'Tin tức',
          tabBarIcon: ({color}) => (
            <Icon name="newspaper" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Store"
        component={Store}
        options={{
          tabBarLabel: 'Cửa hàng',
          tabBarIcon: ({color}) => (
            <Icon name="store" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarBadge: notificationCount > 0 ? notificationCount : undefined,
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({color}) => (
            <Icon name="notifications" color={color} size={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({color}) =>
            user ? (
              <Avatar size={iconSize} rounded source={{uri: user.avatar}} />
            ) : (
              <Icon name="account-circle" color={color} size={iconSize} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
