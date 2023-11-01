import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Header, Icon, LinearProgress} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import moment from 'moment';
import {styles} from './styles';
import {ScrollView} from 'react-native';
import NewsItem from './components/NewsItem';
import {newsActions} from '../../actions/newsActions';
import _ from 'lodash';
import {NewsType} from '../../types/newsType';
import {ActivityIndicator} from 'react-native';

export default function News() {
  const newsList = useAppSelector(state => state.news.newsList);
  const [tagSelected, setTagSelected] = useState<Array<string>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newsFiltered, setNewsFiltered] = useState<Array<NewsType>>(newsList);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const allTags = newsList.flatMap(data => data.tags);
  const tags = Array.from(new Set(allTags.map(tag => tag.name)));

  const fetchNews = async () => {
    setRefreshing(true);
    try {
      dispatch(newsActions.gets());
    } catch (error) {
      throw error;
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRefresh = () => {
    fetchNews();
  };

  const handleSelectTag = (tag: string) => {
    const tagExisted = tagSelected.findIndex(currentTag => currentTag === tag);

    if (tagExisted === -1) {
      setTagSelected([...tagSelected, tag]);
    } else {
      const tagUpdated = [...tagSelected];
      tagUpdated.splice(tagExisted, 1);
      setTagSelected(tagUpdated);
    }
  };

  useEffect(() => {
    const data = tagSelected.length
      ? newsList.filter(item =>
          item.tags.some(tag => tagSelected.includes(tag.name)),
        )
      : newsList;
    setNewsFiltered(data);
  }, [tagSelected, newsList]);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          isLoading ? <ActivityIndicator color={mainColor} /> : <></>
        }
        centerComponent={
          <Text style={{textTransform: 'capitalize', fontSize: 18}}>
            {moment().format('dddd, Do MMMM  YYYY')}
          </Text>
        }
        rightComponent={<Icon name="sort" size={30} color={mainColor} />}
        barStyle="dark-content"
        backgroundColor="transparent"
      />

      {isLoading && <LinearProgress />}

      <FlatList
        data={tags}
        horizontal={true}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Text
            onPress={() => handleSelectTag(item)}
            style={{
              ...styles.textTag,
              backgroundColor: tagSelected.includes(item)
                ? mainColor
                : 'transparent',
            }}>
            #{item}
          </Text>
        )}
      />

      <ScrollView
        style={styles.newsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={mainColor}
            onRefresh={handleRefresh}
          />
        }>
        {newsFiltered.map(data => (
          <NewsItem key={data._id!} {...data} />
        ))}
      </ScrollView>
    </View>
  );
}
