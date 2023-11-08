import {View, ActivityIndicator, TextInput, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Icon, LinearProgress} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import SearchItem from './components/SearchItem';
import {ProductType} from '../../types/productType';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';
import {productActions} from '../../actions/productActions';

const Search = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [productsResearch, setProductsResearch] = useState<Array<ProductType>>(
    [],
  );

  const [isLoading, setIsLoading] = useState(false);
  const searchProduct = async () => {
    setIsLoading(true);
    await dispatch(productActions.searchProducts(searchQuery))
      .unwrap()
      .then(data => setProductsResearch(data))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    searchProduct();
  }, [searchQuery]);

  return (
    <View>
      <Header
        backgroundColor="transparent"
        leftComponent={
          <Icon
            size={30}
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={
          <View style={styles.inputSubContainer}>
            <Icon name="search" size={25} color={mainColor} />
            <TextInput
              autoFocus={true}
              placeholder="Tìm kiếm"
              selectionColor={mainColor}
              style={styles.inputText}
              onChangeText={setSearchQuery}
            />
          </View>
        }
      />

      <View>
        {isLoading ? (
          <ActivityIndicator color={mainColor} />
        ) : (
          <FlatList
            keyExtractor={item => item._id!}
            data={productsResearch}
            renderItem={({item}) => <SearchItem {...item} />}
          />
        )}
      </View>
    </View>
  );
};

export default Search;
