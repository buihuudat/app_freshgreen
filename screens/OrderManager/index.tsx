import {View} from 'react-native';
import React from 'react';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Refure from './components/Refure';
import Pending from './components/Pending';
import Done from './components/Done';
import CartIcon from '../../components/CartIcon';

const Tab = createMaterialTopTabNavigator();

const OrderManager = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: mainColor,
            tabBarPressColor: mainColor,
            tabBarIndicatorStyle: {backgroundColor: mainColor, height: 3},
          }}>
          <Tab.Screen
            name="Spending"
            component={Pending}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="pending-actions" color={color} size={22} />
              ),
            }}
          />
          <Tab.Screen
            name="Refure"
            component={Refure}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="cancel-presentation" color={color} size={22} />
              ),
            }}
          />
          <Tab.Screen
            name="Done"
            component={Done}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="credit-score" color={color} size={22} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default OrderManager;
