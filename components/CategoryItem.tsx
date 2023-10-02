import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {CategoryType} from '../types/categoryType';
import {HomeAds1} from '../constants/images';
import {lightGreen} from '../constants/colors';

interface Props {
  category: CategoryType;
  size?: number;
}

export default function CategoryItem(props: Props) {
  const {category} = props;
  return (
    <View
      style={{
        width: props.size || 120,
        height: props.size || 120,
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
        padding: 3,
      }}>
      <Image source={HomeAds1} style={styles.image} />
      <Text style={styles.text}>{category.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },

  text: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
    color: lightGreen,
  },
});
