import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Skeleton, Button, Rating} from '@rneui/themed';
import {mainColor} from '../constants/colors';

const ProductCardSaleSkeleton = () => {
  return (
    <Card containerStyle={styles.card}>
      <Skeleton style={styles.image} />
      <View style={styles.content}>
        <View style={styles.time}>
          <Card containerStyle={styles.timeContent}>
            <Skeleton style={styles.title} />
            <Skeleton style={styles.subtitle} />
          </Card>
          <Card containerStyle={styles.timeContent}>
            <Skeleton style={styles.title} />
            <Skeleton style={styles.subtitle} />
          </Card>
          <Card containerStyle={styles.timeContent}>
            <Skeleton style={styles.title} />
            <Skeleton style={styles.subtitle} />
          </Card>
          <Card containerStyle={styles.timeContent}>
            <Skeleton style={styles.title} />
            <Skeleton style={styles.subtitle} />
          </Card>
        </View>

        <Card containerStyle={styles.contentInfo}>
          <Skeleton style={styles.contentInfoTitle} />
          <Rating imageSize={22} readonly />
          <Skeleton style={styles.price} />
          <Button color={mainColor}>
            <Skeleton style={{width: 150, height: 30}} />
          </Button>
        </Card>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 0,
    height: 200,
  },
  image: {
    width: 'auto',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
    gap: 2,
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeContent: {
    width: 60,
    borderRadius: 10,
    padding: 2,
  },
  title: {
    fontSize: 23,
    height: 20,
    borderRadius: 5,
  },
  subtitle: {
    textAlign: 'center',
    height: 15,
    borderRadius: 5,
  },

  contentInfo: {
    borderRadius: 10,
    paddingTop: 1,
  },
  contentInfoTitle: {
    fontSize: 22,
    height: 20,
    borderRadius: 5,
  },
  price: {
    paddingVertical: 3,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: mainColor,
    height: 20,
    borderRadius: 5,
  },
});

export default ProductCardSaleSkeleton;
