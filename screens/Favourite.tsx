import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import ProductCard from '../components/ProductCard';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import ProductItem from '../components/ProductItem';

export default function Favourite() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {favoriteProducts} = useAppSelector(
    (state: RootState) => state.favorite,
  );

  const [changeView, setChangeView] = useState(false);

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="transparent"
        barStyle="dark-content"
        leftComponent={
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            color={mainColor}
          />
        }
        centerComponent={
          <Text style={styles.headerTitle}>
            {favoriteProducts.length} sản phẩm
          </Text>
        }
        rightComponent={
          <TouchableOpacity onPress={() => setChangeView(!changeView)}>
            {changeView ? (
              <Icon name="grid-view" color={mainColor} />
            ) : (
              <Icon name="view-list" color={mainColor} />
            )}
          </TouchableOpacity>
        }
      />
      <FlatList
        contentContainerStyle={styles.productList}
        data={favoriteProducts}
        numColumns={2}
        key={changeView ? 'lists' : 'gird'}
        horizontal={false}
        keyExtractor={item => item._id!}
        renderItem={({item}) => {
          return changeView ? (
            <ProductItem {...item} />
          ) : (
            <ProductCard product={item} />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 22,
  },

  productList: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
