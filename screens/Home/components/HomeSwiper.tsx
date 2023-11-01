import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';

const HomeSwiper = () => {
  const banners = useAppSelector((state: RootState) => state.settings.banners);

  return (
    <View style={styles.container}>
      <Swiper
        containerStyle={styles.wrapper}
        showsButtons={false}
        loop
        autoplay
        autoplayTimeout={5}
        paginationStyle={false}
        showsPagination={false}>
        {banners.images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image
              source={{uri: image}}
              style={{height: '100%'}}
              resizeMode="contain"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default HomeSwiper;

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', height: 200, paddingBottom: 10},
  wrapper: {
    width: '100%',
    height: '100%',
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 'auto',
  },
});
