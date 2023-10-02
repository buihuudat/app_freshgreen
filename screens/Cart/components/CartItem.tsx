import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import React, {memo, useState} from 'react';
import {ProductCartType} from '../../../types/cartType';
import {styles} from '../styles';
import {Icon} from '@rneui/themed';
import {moneyFormat} from '../../../utils/handlers/moneyFormat';
import {mainColor} from '../../../constants/colors';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {cartActions} from '../../../actions/cartActions';
import {RootState} from '../../../redux/store';

const CartItem = memo((product: ProductCartType) => {
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    if (product.count === 20) return;
    dispatch(
      cartActions.upCountProduct({
        userId: user?._id!,
        productId: product._id!,
      }),
    );
  };
  const handleRemove = () => {
    dispatch(
      cartActions.downCountProduct({
        userId: user?._id!,
        productId: product._id!,
      }),
    );
  };

  const handleDelete = () => {
    dispatch(
      cartActions.removeProduct({
        userId: user?._id!,
        productId: product._id!,
      }),
    );
  };

  return (
    <View style={styles.cartItem}>
      <ImageBackground style={styles.image} source={{uri: product.images[0]}} />
      <View>
        <View style={styles.viewTitle}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Icon onPress={handleDelete} name="highlight-off" color={'red'} />
        </View>

        <Text>{product.shop?.name || 'Amonius'} </Text>

        <View style={styles.viewPrice}>
          <Text style={styles.price}>{moneyFormat(product.lastPrice)}</Text>
          <View style={styles.upDown}>
            <TouchableOpacity onPress={handleRemove}>
              <Icon name="remove-circle-outline" color={mainColor} />
            </TouchableOpacity>
            <Text style={styles.upDownText}>{product.count}</Text>
            <TouchableOpacity onPress={handleAdd}>
              <Icon name="add-circle" color={mainColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
});

export default CartItem;
