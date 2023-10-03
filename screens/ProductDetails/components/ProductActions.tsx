import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {memo, useMemo} from 'react';
import {styles} from '../styles';
import {Badge, Icon} from '@rneui/themed';
import {ProductType} from '../../../types/productType';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {CommentType} from '../../../types/commentType';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {favoriteActions} from '../../../actions/favoriteActions';
import {cartActions} from '../../../actions/cartActions';
import {UserType} from '../../../types/userType';

interface Props {
  product: ProductType;
  productCount: number;
  user: UserType;
}

const ProductActions = memo((props: Props) => {
  const {product, productCount, user} = props;
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const favorites = useAppSelector(
    (state: RootState) => state.favorite.favoriteProducts,
  );

  const isFavorite = favorites.find(favorite => favorite._id === product._id);
  const isArrayValid = useMemo(
    () => product.comments?.every(comment => typeof comment !== 'string'),
    [product.comments],
  );

  const handleReviews = () => {
    navigation.navigate('ProductReviews', {
      comments: product.comments as Array<CommentType>,
      productName: product.title,
      productId: product._id!,
      averageStarRating: product.averageStarRating,
    });
  };
  const handleFavorite = async () => {
    if (!user) {
      return Alert.alert('⚠️', 'Bạn chưa đăng nhập');
    }
    dispatch(favoriteActions.update({userId: user?._id!, product}));
  };
  const handleAddProduct = () => {
    if (!user) {
      return Alert.alert('⚠️', 'Bạn chưa đăng nhập');
    }
    dispatch(
      cartActions.addProductToCart({
        userId: user?._id!,
        product: {...product, count: productCount},
      }),
    );
  };

  const handleCompare = () => {};

  return (
    <View style={styles.productActions}>
      <View style={styles.actionsContent}>
        <View>
          <Icon
            onPress={handleCompare}
            style={{...styles.iconReviews, backgroundColor: '#A5D9EC'}}
            color={'white'}
            name="compare"
            disabled={!isArrayValid}
          />
          {product.comments.length > 0 && (
            <Badge
              status="primary"
              value={product.comments.length}
              containerStyle={{position: 'absolute', top: 5, left: 45}}
            />
          )}
        </View>
        <View>
          <Icon
            onPress={handleReviews}
            style={{...styles.iconReviews, backgroundColor: '#EDEB8F'}}
            color={'white'}
            name="reviews"
            disabled={!isArrayValid}
          />
          {product.comments.length > 0 && (
            <Badge
              status="primary"
              value={product.comments.length}
              containerStyle={{position: 'absolute', top: 5, left: 45}}
            />
          )}
        </View>
        <Icon
          onPress={handleFavorite}
          style={{...styles.iconReviews, backgroundColor: 'pink'}}
          color={'white'}
          name={`favorite${!isFavorite ? '-outline' : ''}`}
        />
        <TouchableOpacity
          onPress={handleAddProduct}
          style={styles.actionAddCart}>
          <Text style={styles.actionText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ProductActions;
