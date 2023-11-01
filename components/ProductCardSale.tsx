import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {ProductType} from '../types/productType';
import {Button, Card, Icon} from '@rneui/themed';
import {Rating} from 'react-native-ratings';
import {moneyFormat} from '../utils/handlers/moneyFormat';
import {mainColor} from '../constants/colors';
import moment from 'moment';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import {cartActions} from '../actions/cartActions';
import Toast from 'react-native-toast-message';

interface Props {
  product: ProductType;
  timeCount: number;
}

const ProductCardSale = memo((product: ProductType) => {
  const ms = 1;
  const [time, setTime] = useState({
    d: (ms * 60 * 60 * 24) / 1000,
    h: (ms * 60 * 60) / 100,
    m: ms * 60,
    s: ms,
  });

  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const handleAddProduct = () => {
    if (!user) return Toast.show({type: 'error', text1: 'Bạn chưa đăng nhập'});
    dispatch(
      cartActions.addProductToCart({
        userId: user?._id!,
        product: {...product, count: 1},
      }),
    );
  };

  // var countDownDate = moment('10-26-2023 +0000', 'MM-DD-YYYY Z').valueOf();

  // useEffect(() => {
  //   setInterval(() => {
  //     const now = new Date().getTime();
  //     const distance = countDownDate - now;

  //     setTime(prev => ({
  //       ...prev,
  //       d: Math.floor(distance / (1000 * 60 * 60 * 24)),
  //       h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  //       m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
  //       s: Math.floor((distance % (1000 * 60)) / 1000),
  //     }));
  //   }, 1000);
  // }, [countDownDate]);

  return (
    <Card containerStyle={styles.card}>
      <ImageBackground
        style={styles.image}
        imageStyle={{borderRadius: 10}}
        source={{uri: product.images[0]}}>
        <View style={styles.content}>
          <View style={styles.time}>
            <Card containerStyle={styles.timeContent}>
              <Card.Title style={styles.title}>{time.d}</Card.Title>
              <Text style={styles.subtitle}>Ngày</Text>
            </Card>
            <Card containerStyle={styles.timeContent}>
              <Card.Title style={styles.title}>{time.h}</Card.Title>
              <Text style={styles.subtitle}>Giờ</Text>
            </Card>
            <Card containerStyle={styles.timeContent}>
              <Card.Title style={styles.title}>{time.m}</Card.Title>
              <Text style={styles.subtitle}>Phút</Text>
            </Card>
            <Card containerStyle={styles.timeContent}>
              <Card.Title style={styles.title}>{time.s}</Card.Title>
              <Text style={styles.subtitle}>Giây</Text>
            </Card>
          </View>

          <Card containerStyle={styles.contentInfo}>
            <Card.Title style={styles.contentInfoTitle}>
              {product.title}
            </Card.Title>
            <Rating
              imageSize={22}
              startingValue={product.averageStarRating}
              readonly
            />

            <Text style={styles.price}>{moneyFormat(product.lastPrice)}</Text>

            <Button color={mainColor} onPress={handleAddProduct}>
              Thêm vào giỏ hàng{' '}
              <Icon name="add-shopping-cart" color={'white'} />
            </Button>
          </Card>
        </View>
      </ImageBackground>
    </Card>
  );
});

export default ProductCardSale;

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
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 30,
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
  },
  subtitle: {
    textAlign: 'center',
  },

  contentInfo: {
    borderRadius: 10,
    paddingTop: 1,
  },
  contentInfoTitle: {
    fontSize: 22,
  },
  price: {
    paddingVertical: 3,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: mainColor,
  },
});
