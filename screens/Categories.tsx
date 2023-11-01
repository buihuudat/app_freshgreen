import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import CategoryItem from '../components/CategoryItem';
import {useAppSelector} from '../redux/hooks';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {RootState} from '../redux/store';

const Categories = () => {
  const categories = useAppSelector(
    (state: RootState) => state.category.categories,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const categoriesUpdated = [...categories];
  categoriesUpdated.unshift({
    _id: 'all',
    name: 'Tất cả',
    image:
      'https://e7.pngegg.com/pngimages/75/866/png-clipart-category-management-organization-retail-management-miscellaneous-text-thumbnail.png',
  });

  return (
    <View style={styles.container}>
      <Header
        barStyle="dark-content"
        backgroundColor="transparent"
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <FlatList
        numColumns={3}
        contentContainerStyle={styles.categoriesList}
        data={categoriesUpdated}
        keyExtractor={item => item._id!}
        renderItem={({item}) => <CategoryItem category={item} size={100} />}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  categoriesList: {
    alignItems: 'center',
  },
});
