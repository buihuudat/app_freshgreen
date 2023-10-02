import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import moment from 'moment';
import 'moment/locale/vi';
import {styles} from './styles';
import {ScrollView} from 'react-native';
import NewsItem from './components/NewsItem';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {newsActions} from '../../actions/newsActions';

export default function News() {
  const [tagSelected, setTagSelected] = useState<Array<string>>([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const newsList = useAppSelector(state => state.news.newsList);
  const allTags = newsList.flatMap(data => data.tags);
  const tags = Array.from(new Set(allTags.map(tag => tag.name)));

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(newsActions.gets()).then(() => setRefreshing(false));
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

  const newsFiltered = useMemo(() => {
    return newsList.filter(news =>
      news.tags.map(tag => tagSelected.includes(tag.name)),
    );
  }, [tagSelected]);

  console.log(newsFiltered.length, newsList.length);

  return (
    <View style={styles.container}>
      <Header
        centerComponent={
          <Text style={{textTransform: 'capitalize', fontSize: 18}}>
            {moment().format('dddd, Do MMMM  YYYY')}
          </Text>
        }
        rightComponent={<Icon name="sort" size={30} color={mainColor} />}
        barStyle="dark-content"
        backgroundColor="transparent"
      />

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
