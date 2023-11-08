import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {memo} from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {ProductType} from '../../../types/productType';
import {moneyFormat} from '../../../utils/handlers/moneyFormat';
import {mainColor} from '../../../constants/colors';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';

interface ListProps {
  title: string;
  products: Array<ProductType>;
}

const List = ({title, products}: ListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleViewProduct = (product: ProductType) => {
    navigation.navigate('ProductDetail', {product});
  };

  return (
    <View style={{paddingHorizontal: 20, height: 400, flex: 1}}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: '600',
        }}>
        {title}
      </Text>
      <ScrollView nestedScrollEnabled={true}>
        <FlatList
          data={products}
          keyExtractor={item => item._id!}
          renderItem={({item: product}) => (
            <Pressable>
              <TouchableOpacity
                key={product._id!}
                style={{
                  width: 280,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  elevation: 3,
                  margin: 10,
                }}
                onPress={() => handleViewProduct(product)}>
                <Image
                  source={{uri: product.images[0]}}
                  style={{
                    width: 60,
                    borderRadius: 5,
                    height: 60,
                    resizeMode: 'cover',
                  }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: mainColor,
                      flexGrow: 1,
                      width: 210,
                    }}>
                    {product.title}
                  </Text>
                  <Rating
                    imageSize={15}
                    readonly
                    startingValue={product.averageStarRating}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: mainColor,
                      }}>
                      {moneyFormat(product.lastPrice)}/{product.unit}
                    </Text>

                    <Text
                      style={{
                        fontWeight: '600',
                        color: '#999',
                        textDecorationLine: 'line-through',
                      }}>
                      {moneyFormat(product.price)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Pressable>
          )}
        />
      </ScrollView>
    </View>
  );
};

const HomeList = memo(() => {
  const {newProducts, biggestDiscount, ratedHighest, bestSeller} =
    useAppSelector((state: RootState) => state.product);

  const dataFlat: Array<ListProps> = [
    {
      title: 'Giảm giá nhiều nhất',
      products: biggestDiscount,
    },
    {
      title: 'Đã thêm gần đây',
      products: newProducts,
    },
    {
      title: 'Đánh giá cao nhất',
      products: ratedHighest,
    },
    {
      title: 'Bán chạy nhất',
      products: bestSeller,
    },
  ];

  return (
    <View style={{paddingBottom: 100}}>
      <FlatList
        data={dataFlat}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={item => item.title}
        renderItem={item => <List {...item.item} />}
      />
    </View>
  );
});

export default HomeList;
