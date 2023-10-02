import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Skeleton} from '@rneui/themed';

const ProductCardSkeleton = () => {
  return (
    <Card containerStyle={styles.container}>
      <View style={styles.top}>
        <Skeleton style={styles.discount} />
        <Skeleton style={styles.fav} />
      </View>
      <Skeleton animation="pulse" style={styles.imageSkeleton} />
      <Skeleton style={styles.titleSkeleton} />
      <Skeleton style={styles.ratingSkeleton} />
      <Skeleton style={styles.priceSkeleton} />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 155,
    borderRadius: 10,
    padding: 5,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 2,
  },
  discount: {width: 60},
  fav: {width: 40},
  imageSkeleton: {
    height: 100,
    borderRadius: 10,
  },
  titleSkeleton: {
    height: 20,
    marginTop: 5,
    borderRadius: 5,
  },
  ratingSkeleton: {
    height: 20,
    marginTop: 5,
    borderRadius: 5,
  },
  priceSkeleton: {
    height: 30,
    marginTop: 5,
    borderRadius: 5,
  },
});

export default ProductCardSkeleton;
