import {FlatList, RefreshControl, SafeAreaView, View} from 'react-native';
import React, {useState, useMemo} from 'react';
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

export default function Products() {
  const {products} = useAppSelector((state: RootState) => state.product);
  const [index, setIndex] = useState(0);
  const [timeOptions, setTimeOptions] = useState<string>(Time.all);
  const [priceOptions, setpriceOptions] = useState<string>(Price.all);
  const [refreshing, setRefreshing] = useState(false);

  const categories = useAppSelector(
    (state: RootState) => state.category.categories,
  );
  const dispatch = useAppDispatch();
  const categoriesUpdated = [{_id: '0', name: 'all'}, ...categories];

  const productFiltered = useMemo(() => {
    const categorySelected: string = categoriesUpdated[index].name;
    let productUpdated = [...products];

    if (categorySelected !== 'all') {
      productUpdated = products.filter(
        product => product.category === categorySelected,
      );
    }
    if (priceOptions !== Price.all) {
      productUpdated = _.orderBy(productUpdated, [
        'lastPrice',
        priceOptions === Price.up ? 'asc' : 'desc',
      ]);
    }
    if (timeOptions !== Time.all) {
      productUpdated = _.orderBy(productUpdated, [
        timeOptions === Time.new ? 'updatedAt' : 'sold',
        'desc',
      ]);
    }
    return productUpdated;
  }, [categoriesUpdated[index].name, timeOptions, priceOptions, products]);

  const refreshProducts = () => {
    setRefreshing(true);
    dispatch(productActions.gets({page: 1})).then(() => setRefreshing(false));
  };

  const loadMoreProduct = () => {};
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
        />

        <FlatList
          contentContainerStyle={styles.productList}
          numColumns={2}
          data={productFiltered}
          keyExtractor={item => item._id!}
          renderItem={({item}) => {
            return <ProductCard product={item} />;
          }}
          onEndReached={loadMoreProduct}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshProducts}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
