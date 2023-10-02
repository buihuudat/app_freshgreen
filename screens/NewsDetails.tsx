import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import HTML from 'react-native-render-html';
import {newsActions} from '../actions/newsActions';

type Props = NativeStackScreenProps<RootStackParamList, 'NewsDetails'>;

export default function NewsDetails({route, navigation}: Props) {
  const {news} = route.params;
  const newsList = useAppSelector((state: RootState) => state.news.newsList);
  const user = useAppSelector((state: RootState) => state.user.user);
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const isLiked = newsList.some(news => news.likeCount === user?._id);

  useEffect(() => {
    const updateLike = setTimeout(() => {
      dispatch(newsActions.updateViewCount(news._id!));
    }, 10000);

    return () => {
      clearTimeout(updateLike);
    };
  }, []);

  const handleLike = () => {};

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="transparent"
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={
          <View style={styles.viewCount}>
            <Text style={styles.textViewCount}>{news.viewCount || 0}</Text>
            <Icon name="visibility" color={mainColor} />
          </View>
        }
        rightComponent={
          <View style={styles.viewCount}>
            <Text style={styles.textViewCount}>{news.likeCount || 0}</Text>
            <Icon
              name={`thumb-up${isLiked ? '' : '-off-alt'}`}
              color={mainColor}
            />
          </View>
        }
      />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <HTML
          contentWidth={width}
          source={{
            html: news.content,
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  viewCount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  textViewCount: {
    fontSize: 16,
    fontWeight: '500',
  },

  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },

  content: {
    paddingHorizontal: 10,
  },
});
