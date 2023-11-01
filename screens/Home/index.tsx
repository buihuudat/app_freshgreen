import {ScrollView, StyleSheet, RefreshControl, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
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
import {settingsActions} from '../../actions/settingsActionts';
import {categoryActions} from '../../actions/categoryActions';
import {mainColor} from '../../constants/colors';

export default function Home() {
  const {popular, bestSeller, productsView} = useAppSelector(
    (state: RootState) => state.product,
  );
  const [refreshing, setRefreshing] = useState(false);

  const categories = useAppSelector(
    (state: RootState) => state.category.categories,
  );

  const dispatch = useAppDispatch();

  const fetchData = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(settingsActions.getBanner()),
        dispatch(categoryActions.gets()),
        dispatch(productActions.bestSeller()),
        dispatch(productActions.popular()),
        dispatch(productActions.getProductsView()),
      ]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleRefresh = useCallback(() => {
    fetchData();
  }, [dispatch]);

  return (
    <View>
      <Header />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <HomeSwiper />

        <HomeAds />

        <HomeCategory categories={categories} />

        <HomeProducts products={productsView} />

        <BestSellers products={popular} />

        <HomeSale products={bestSeller} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
  },
});
