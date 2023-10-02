import {View, Text, FlatList, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {homeAdsData} from '../data';
import {HomeAdsDataType} from '../../../types/homeType';
import {Button, Icon} from '@rneui/themed';
import {mainColor} from '../../../constants/colors';

const HomeAdsItem = (item: HomeAdsDataType) => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.image}
      source={item.image}
      alt={item.title}
      blurRadius={15}
      imageStyle={{borderRadius: 20}}
      resizeMode="cover">
      <Text style={styles.text}>{item.title}</Text>
      <Button buttonStyle={styles.button}>
        Mua ngay <Icon name="arrow-forward" color={'white'} />
      </Button>
    </ImageBackground>
  </View>
);

const HomeAds = () => {
  return (
    <View>
      <FlatList
        horizontal
        data={homeAdsData}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => HomeAdsItem(item)}
      />
    </View>
  );
};

export default HomeAds;

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 200,
    padding: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    padding: 10,
  },

  text: {
    fontWeight: '500',
    fontSize: 26,
    color: 'black',
    backgroundColor: 'transparent',
  },
  button: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: mainColor,
    padding: 10,
    elevation: 2,
  },
});
