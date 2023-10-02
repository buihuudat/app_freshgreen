import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {ProductType} from '../../../types/productType';
import ProductCard from '../../../components/ProductCard';
import CardSkenleton from '../../../components/CardSkenleton';

const HomeProducts = ({products}: {products: Array<ProductType>}) => {
  return !products.length ? (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <CardSkenleton />
      <CardSkenleton />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Sản phẩm phổ biến</Text>
      <FlatList
        data={products}
        keyExtractor={item => item._id!}
        horizontal={true}
        renderItem={({item}) => <ProductCard product={item} />}
      />
    </View>
  );
};

export default HomeProducts;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
});
