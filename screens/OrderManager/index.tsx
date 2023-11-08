import {ActivityIndicator, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Icon, LinearProgress} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Refure from './components/Refure';
import Pending from './components/Pending';
import CartIcon from '../../components/CartIcon';
import Access from './components/Access';
import {orderActions} from '../../actions/orderActions';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';

const Tab = createMaterialTopTabNavigator();

const OrderManager = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useAppSelector((state: RootState) => state.user.user);

  useEffect(() => {
    user &&
      dispatch(orderActions.getOrders(user._id!))
        .unwrap()
        .then(() => setIsLoading(false));
  }, [user]);

  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor="transparent"
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<CartIcon />}
      />
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator color={mainColor} />
        ) : (
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: mainColor,
              tabBarPressColor: mainColor,
              tabBarIndicatorStyle: {backgroundColor: mainColor, height: 3},
            }}>
            <Tab.Screen
              name="Chờ xác nhận"
              component={Pending}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="pending-actions" color={color} size={22} />
                ),
              }}
            />
            <Tab.Screen
              name="Đã xác nhận"
              component={Access}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="cancel-presentation" color={color} size={22} />
                ),
              }}
            />
            <Tab.Screen
              name="Đã hủy"
              component={Refure}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="credit-score" color={color} size={22} />
                ),
              }}
            />
          </Tab.Navigator>
        )}
      </View>
    </View>
  );
};

export default OrderManager;
