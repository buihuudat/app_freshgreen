import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ProductCartType} from '../../../types/cartType';
import {styles} from '../styles';
import {moneyFormat} from '../../../utils/handlers/moneyFormat';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';

const OrderProductItem = (product: ProductCartType) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleViewProduct = () => {
    navigation.navigate('ProductDetail', {product});
  };

  return (
    <TouchableOpacity
      onPress={handleViewProduct}
      style={styles.orderProductItem}>
      <Image
        style={styles.orderProductItemImage}
        source={{uri: product.images[0]}}
      />

      <View style={styles.titleQuantity}>
        <Text style={styles.orderProductItemTitle}>{product.title}</Text>
        <View style={styles.quantityPrice}>
          <Text>Số lượng: {product.count}</Text>
          <Text style={styles.textPrice}>{moneyFormat(product.lastPrice)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderProductItem;
