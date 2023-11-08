import {View, Text, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {ProductType} from '../../../types/productType';
import ProductCardSale from '../../../components/ProductCardSale';
import Swiper from 'react-native-swiper';
import ProductCardSaleSkeleton from '../../../components/CardSaleSkeleton';

interface Props {
  products: Array<ProductType>;
}

const HomeSale = memo((props: Props) => {
  const {products} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ưu đãi trong tháng </Text>

      {!products.length ? (
        <ProductCardSaleSkeleton />
      ) : (
        <Swiper
          style={styles.swapper}
          loop
          autoplay
          centerContent
          showsPagination={false}
          autoplayTimeout={3}>
          {products.map(product => (
            <View style={styles.slide} key={product._id}>
              <ProductCardSale {...product} key={product._id!} />
            </View>
          ))}
        </Swiper>
      )}
    </View>
  );
});

export default HomeSale;

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
  },

  swapper: {},

  slide: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
