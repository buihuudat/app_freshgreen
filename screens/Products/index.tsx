import {FlatList, RefreshControl, SafeAreaView, View} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import Header from './components/Header';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import {Price, Time} from '../../types/SelectType';
import _ from 'lodash';
import {productActions} from '../../actions/productActions';
import ProductCard from '../../components/ProductCard';
import {SelectMenu} from './components/SelectMenu';
import {styles} from './styles';
import TabSelect from './components/TabSelect';
import ProductItem from '../../components/ProductItem';

export default function Products() {
  const {products, category} = useAppSelector(
    (state: RootState) => state.product,
  );

  const [index, setIndex] = useState(0);
  const [timeOptions, setTimeOptions] = useState<string>(Time.all);
  const [priceOptions, setpriceOptions] = useState<string>(Price.all);
  const [refreshing, setRefreshing] = useState(false);
  const [changeFilter, setChangeFilter] = useState(false);
  const [changeView, setChangeView] = useState(true);

  const categories = useAppSelector(
    (state: RootState) => state.category.categories,
  );
  const dispatch = useAppDispatch();
  const categoriesUpdated = [{_id: '0', name: 'all', image: ''}, ...categories];
  let productUpdated = [...products];

  const fetchProducts = async () => {
    setRefreshing(true);
    try {
      await dispatch(productActions.gets({page: 1})).then(() =>
        setRefreshing(false),
      );
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      productUpdated = products.filter(
        product => product.category === category,
      );
      const categoryIndex = categoriesUpdated.findIndex(
        data => data.name === category,
      );
      if (categoryIndex !== -1) {
        setIndex(categoryIndex);
      }
    }

    return () => {};
  }, [category]);

  const productFiltered = useMemo(() => {
    setChangeFilter(true);
    const categorySelected: string = categoriesUpdated[index].name;

    if (categorySelected !== 'all') {
      productUpdated = products.filter(
        product => product.category === categorySelected,
      );
    }
    if (priceOptions !== Price.all) {
      productUpdated = _.orderBy(
        productUpdated,
        ['lastPrice'],
        priceOptions === Price.up ? 'asc' : 'desc',
      );
    }
    if (timeOptions !== Time.all) {
      productUpdated = _.orderBy(
        productUpdated,
        [timeOptions === Time.new ? 'updatedAt' : 'sold'],
        'desc',
      );
    }
    return productUpdated;
  }, [index, timeOptions, priceOptions, products]);

  const refreshProducts = () => {
    fetchProducts();
  };

  const loadMoreProduct = () => {};
  const throttledRefresh = _.throttle(refreshProducts, 1000);

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <TabSelect
        index={index}
        setIndex={setIndex}
        categoriesUpdated={categoriesUpdated}
      />

      <View style={styles.container}>
        <SelectMenu
          priceOptions={priceOptions}
          timeOptions={timeOptions}
          setpriceOptions={setpriceOptions}
          setTimeOptions={setTimeOptions}
          changeView={changeView}
          setChangeView={setChangeView}
        />

        <FlatList
          key={changeView ? 'lists' : 'gird'}
          contentContainerStyle={styles.productList}
          numColumns={changeView ? 1 : 2}
          data={changeFilter ? productFiltered : products}
          keyExtractor={item => item._id!}
          renderItem={({item}) => {
            return changeView ? (
              <ProductItem {...item} />
            ) : (
              <ProductCard product={item} />
            );
          }}
          onEndReached={loadMoreProduct}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={throttledRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
