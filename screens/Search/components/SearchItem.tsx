import {TouchableOpacity, Text, Image, View} from 'react-native';
import React, {useState} from 'react';
import {ProductType} from '../../../types/productType';
import {styles} from '../styles';
import {Rating} from 'react-native-ratings';
import {moneyFormat} from '../../../utils/handlers/moneyFormat';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';

const SearchItem = (product: ProductType) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleViewProduct = () => {
    navigation.navigate('ProductDetail', {product});
  };

  return (
    <TouchableOpacity onPress={handleViewProduct} style={styles.productItem}>
      <Image
        style={styles.imageProductItem}
        source={{uri: product.images[0]}}
      />
      <View style={styles.itemContent}>
        <Text style={styles.titleProductItem}>{product.title}</Text>
        <View style={styles.rating}>
          <Rating startingValue={product.averageStarRating} imageSize={15} />
          <Text>({product.comments.length})</Text>
        </View>
      </View>
      <Text style={styles.price}>
        {moneyFormat(product.lastPrice)}/{product.unit}
      </Text>
    </TouchableOpacity>
  );
};

export default SearchItem;
