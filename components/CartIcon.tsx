import {TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {Badge, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {useAppSelector} from '../redux/hooks';

const CartIcon = () => {
  const productsInCart = useAppSelector(
    state => state.cart.data.products,
  ).length;
  const cartCount = useMemo(
    () => (productsInCart > 9 ? productsInCart + '+' : productsInCart),
    [productsInCart],
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleViewCart = () => {
    navigation.navigate('Cart');
  };
  return (
    <TouchableOpacity onPress={handleViewCart}>
      <Icon name="shopping-cart" color={mainColor} size={28} />
      <Badge
        status="error"
        value={cartCount}
        containerStyle={{position: 'absolute', top: -10, left: 15}}
      />
    </TouchableOpacity>
  );
};

export default CartIcon;
