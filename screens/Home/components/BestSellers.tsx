import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {ProductType} from '../../../types/productType';
import {Banner2} from '../../../constants/images';
import {Button, Icon} from '@rneui/themed';
import {darkGreen, mainColor} from '../../../constants/colors';
import ProductCard from '../../../components/ProductCard';

const BestSellers = ({products}: {products: Array<ProductType>}) => {
  const date = new Date();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bán chạy nhất tháng {date.getMonth()}</Text>

      <View>
        <ImageBackground
          style={styles.bgImg}
          imageStyle={{borderRadius: 5}}
          resizeMode="cover"
          blurRadius={5}
          source={Banner2}>
          <Text style={styles.textBanner}>
            Khám phá thêm những sản phẩm mới
          </Text>
          <Button buttonStyle={styles.btnBanner}>
            Mua ngay <Icon name="arrow-forward" color={'white'} />
          </Button>

          <FlatList
            data={products}
            horizontal={true}
            keyExtractor={item => item._id!}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <ProductCard product={item} countShow={true} />
            )}
          />
        </ImageBackground>
      </View>
    </View>
  );
};

export default BestSellers;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingVertical: 3,
  },
  bgImg: {
    width: '100%',
    height: 500,
    padding: 20,
  },

  textBanner: {
    fontSize: 40,
    fontWeight: '600',
    color: darkGreen,
  },
  btnBanner: {
    backgroundColor: mainColor,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
});
