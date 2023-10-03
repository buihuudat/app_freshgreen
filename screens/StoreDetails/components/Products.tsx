import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {styles} from '../styles';
import ProductCard from '../../../components/ProductCard';

const Products = () => {
  const {products, totalProducts} = useAppSelector(
    (state: RootState) => state.product.shopProducts,
  );

  return (
    <View style={styles.products}>
      <Text style={styles.productTitle}>Hiện có {totalProducts} sản phẩm</Text>
      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={item => item._id!}
        numColumns={2}
        horizontal={false}
        renderItem={({item}) => <ProductCard product={item} />}
      />
    </View>
  );
};

export default Products;
