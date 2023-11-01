import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {Card, Icon} from '@rneui/themed';
import {ProductType} from '../types/productType';
import {Rating} from 'react-native-ratings';
import {mainColor} from '../constants/colors';
import {moneyFormat} from '../utils/handlers/moneyFormat';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {favoriteActions} from '../actions/favoriteActions';
import {RootState} from '../redux/store';
import {cartActions} from '../actions/cartActions';
import Toast from 'react-native-toast-message';

interface Props {
  product: ProductType;
  countShow?: boolean;
}

const ProductCard = memo((props: Props) => {
  const {product, countShow = false} = props;
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
    <Card containerStyle={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>
          {countShow
            ? `đã bán: ${product.sold}`
            : product.discount > 0 && `- ${product.discount}%`}
        </Text>
        <Icon
          onPress={handleFavorite}
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={20}
          color={'red'}
        />
      </View>
      <TouchableOpacity onPress={handleViewProduct}>
        <Card.Image
          source={{uri: product.images[0]}}
          resizeMode="cover"
          style={{height: 100}}
        />
        <Text style={styles.title}>{product.title}</Text>
        <Rating
          startingValue={product.averageStarRating}
          style={styles.rate}
          imageSize={15}
        />

        <Text style={styles.price}>{moneyFormat(product.lastPrice)}</Text>
      </TouchableOpacity>

      <View style={styles.add}>
        <TouchableOpacity style={styles.btnCart} onPress={handleAddProduct}>
          <Icon name="add-shopping-cart" color={'white'} size={18} />
        </TouchableOpacity>
      </View>
    </Card>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: 155,
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 2,
    marginBottom: 20,
  },
  title: {
    height: 40,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  rate: {
    padding: 0,
    margin: 0,
    width: '100%',
  },

  price: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: mainColor,
  },

  top: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 3,
    paddingTop: 0,
  },
  topText: {
    color: 'orange',
    fontSize: 13,
    fontWeight: '600',
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
});
