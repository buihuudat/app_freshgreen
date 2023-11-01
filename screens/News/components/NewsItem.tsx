import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {NewsType} from '../../../types/newsType';
import {fullnameOfUser} from '../../../types/userType';
import {styles} from '../styles';
import {Icon, Image} from '@rneui/themed';
import {NoImage, UserImage} from '../../../constants/images';
import {mainColor, thirColor} from '../../../constants/colors';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';

export default function NewsItem(news: NewsType) {
  const userAvatar = news.author?.avatar
    ? {uri: news.author.avatar}
    : UserImage;

  const thumbnail =
    news.thumbnail || news.thumbnail !== '' ? {uri: news.thumbnail} : NoImage;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleViewAuth = () => {
    navigation.navigate('StoreDetails', {storeId: news.author._id});
  };
  const handleViewNew = () => {
    navigation.navigate('NewsDetails', {news});
  };

  return (
    <View style={styles.newsItem}>
      <Image source={thumbnail} style={styles.image} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} onPress={handleViewNew}>
          {news.title}
        </Text>

        <TouchableOpacity onPress={handleViewAuth} style={styles.user}>
          <Image style={styles.userImage} source={userAvatar} />
          <Text style={styles.userText} onPress={handleViewAuth}>
            {news.author?.fullname
              ? fullnameOfUser(news.author?.fullname)
              : 'Anonymous'}
          </Text>
        </TouchableOpacity>

        <View style={styles.newsInfo}>
          <View style={styles.newsInfo}>
            <Text style={styles.newsInfoText}>{news.viewCount}</Text>
            <Icon name="visibility" color={thirColor} />
          </View>
          <View style={styles.newsInfo}>
            <Text style={{color: mainColor}}>Lượt thích:</Text>
            <Text style={styles.newsInfoText}>{news.likeCount.length}</Text>
            <Text style={{fontStyle: 'italic'}}>
              - {moment(news.createdAt).format('l')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
