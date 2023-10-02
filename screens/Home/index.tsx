import {ScrollView, StyleSheet, RefreshControl, View} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import HomeSwiper from './components/HomeSwiper';
import HomeAds from './components/HomeAds';
import HomeProducts from './components/HomeProducts';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {productActions} from '../../actions/productActions';
import {RootState} from '../../redux/store';
import BestSellers from './components/BestSellers';
import HomeSale from './components/HomeSale';
import Header from './components/Header';
import HomeCategory from './components/HomeCategory';

export default function Home() {
  const {products} = useAppSelector((state: RootState) => state.product);

  const loading = false;

  const categories = useAppSelector(
    (state: RootState) => state.category.categories,
  );

  const dispatch = useAppDispatch();

  const getProducts = async () => {
    try {
      await dispatch(productActions.gets({page: 1, perPage: 10}));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const memoizedProducts = useMemo(() => products.slice(0, 8), [products]);

  const handleRefresh = useCallback(() => {
    getProducts();
  }, [dispatch]);

  return (
    <View>
      <Header />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }>
        <HomeSwiper />

        <HomeAds />

        <HomeCategory categories={categories} />

        <HomeProducts products={memoizedProducts} />

        <BestSellers products={memoizedProducts} />

        <HomeSale products={memoizedProducts} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
});
