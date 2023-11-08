import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ProductType} from '../types/productType';
import {Rating} from 'react-native-ratings';
import {mainColor} from '../constants/colors';
import {moneyFormat} from '../utils/handlers/moneyFormat';
import {Icon} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import {favoriteActions} from '../actions/favoriteActions';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {cartActions} from '../actions/cartActions';
import {useNavigation} from '@react-navigation/native';

const ProductItem = (product: ProductType) => {
  const favorites = useAppSelector(
    (state: RootState) => state.favorite.favoriteProducts,
  );
  const user = useAppSelector((state: RootState) => state.user.user);
  const isFavorite = favorites.find(f => f._id === product._id);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handleViewProduct = () => {
    navigation.navigate('ProductDetail', {product});
  };

  const handleFavorite = () => {
    if (!user) return Toast.show({type: 'error', text1: 'Bạn chưa đăng nhập'});
    dispatch(favoriteActions.update({userId: user?._id!, product}));
  };
  const handleAddProduct = () => {
    if (!user) return Toast.show({type: 'error', text1: 'Bạn chưa đăng nhập'});
    dispatch(
      cartActions.addProductToCart({
        userId: user?._id!,
        product: {...product, count: 1},
      }),
    );
  };

  return (
    <View style={styles.item}>
      <Image source={{uri: product.images[0]}} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.contentItem}>
          <Text style={styles.title}>
            {product.title.length > 20
              ? product.title.slice(0, 20) + '...'
              : product.title}
          </Text>
          {product.discount > 0 && (
            <Text style={styles.discount}>-{product.discount}%</Text>
          )}
        </View>
        <View style={styles.contentItem}>
          <View style={styles.rate}>
            <Rating imageSize={18} startingValue={product.averageStarRating} />
            <Text>({product.comments.length})</Text>
          </View>
          <Text style={styles.price}>
            {moneyFormat(product.lastPrice)}/{product.unit}
          </Text>
        </View>
        <View style={styles.contentItem}>
          <Icon
            onPress={handleFavorite}
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={20}
            color={'red'}
          />
          <TouchableOpacity style={styles.btnCart} onPress={handleAddProduct}>
            <Icon name="add-shopping-cart" color={'white'} size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.view} onPress={handleViewProduct}>
            <Text style={{color: mainColor}}>Chi tiết</Text>
            <Icon name="arrow-right-alt" color={mainColor} size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  item: {
    elevation: 5,
    width: '100%',
    marginVertical: 10,
    marginHorizontal: 'auto',

    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },

  content: {
    display: 'flex',
    width: '70%',
    flexDirection: 'column',
  },

  contentItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  discount: {
    fontSize: 16,
    fontWeight: '600',
    color: 'orange',
  },

  price: {
    fontSize: 22,
    fontWeight: '600',
    color: mainColor,
  },
  add: {
    paddingTop: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCart: {
    padding: 2,
    paddingHorizontal: 20,
    backgroundColor: mainColor,
    width: 60,
    borderRadius: 20,
  },

  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});
