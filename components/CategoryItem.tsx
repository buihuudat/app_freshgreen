import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {CategoryType} from '../types/categoryType';
import {lightGreen} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {useAppDispatch} from '../redux/hooks';
import {setCategory} from '../redux/slices/productSlice';

interface Props {
  category: CategoryType;
  size?: number;
}

const CategoryItem = memo((props: Props) => {
  const {category} = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const handleViewProductsList = () => {
    dispatch(setCategory(category.name));
    navigation.navigate('Products');
  };
  return (
    <TouchableOpacity
      onPress={handleViewProductsList}
      style={{
        ...styles.item,
        width: props.size || 130,
        height: props.size ? props.size + 20 : 150,
      }}>
      <Image source={{uri: category.image}} style={styles.image} />
      <Text style={styles.text}>{category.name}</Text>
    </TouchableOpacity>
  );
});

export default CategoryItem;

const styles = StyleSheet.create({
  item: {
    padding: 3,
    margin: 20,
    marginLeft: 10,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.55)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },

  image: {
    height: '70%',
    borderRadius: 10,
  },

  text: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: lightGreen,
  },
});
