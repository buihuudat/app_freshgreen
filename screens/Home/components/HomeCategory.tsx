import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {CategoryType} from '../../../types/categoryType';
import CategoryItem from '../../../components/CategoryItem';

type Props = {
  categories: Array<CategoryType>;
};

export default function HomeCategory(props: Props) {
  const {categories} = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={item => item._id!}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item}) => <CategoryItem category={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
