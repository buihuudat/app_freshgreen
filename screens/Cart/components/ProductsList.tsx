import {View, FlatList, Text} from 'react-native';
import React, {memo} from 'react';
import {ProductCartType} from '../../../types/cartType';
import CartItem from './CartItem';
import {styles} from '../styles';

interface Props {
  products: Array<ProductCartType>;
}

const ProductsList = memo((props: Props) => {
  const {products} = props;

  return products.length ? (
    <View style={styles.productList}>
      <FlatList
        data={products}
        keyExtractor={item => item._id!}
        renderItem={({item}) => <CartItem {...item} />}
      />
    </View>
  ) : (
    <Text style={styles.noProduct}>Giỏ hàng trống</Text>
  );
});

export default ProductsList;
