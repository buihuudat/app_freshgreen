import {View, ActivityIndicator, TextInput, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Icon, LinearProgress} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import SearchItem from './components/SearchItem';
import {ProductType} from '../../types/productType';
import {useAppSelector} from '../../redux/hooks';
import {RootState} from '../../redux/store';

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [productsResearch, setProductsResearch] = useState<Array<ProductType>>(
    [],
  );

  const products = useAppSelector((state: RootState) => state.product.products);

  useEffect(() => {
    const rs =
      searchQuery === ''
        ? []
        : products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()),
          );
    setProductsResearch(rs ?? []);
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
        <FlatList
          keyExtractor={item => item._id!}
          data={productsResearch}
          renderItem={({item}) => <SearchItem {...item} />}
        />
      </View>
    </View>
  );
};

export default Search;
