import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import HTML from 'react-native-render-html';
import {newsActions} from '../actions/newsActions';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'NewsDetails'>;

export default function NewsDetails({route, navigation}: Props) {
  const {news} = route.params;
  const user = useAppSelector((state: RootState) => state.user.user);
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const checkLike = news.likeCount.some(like => like === user?._id!);
  const [liked, setLiked] = useState(checkLike);

  useEffect(() => {
    const updateLike = setTimeout(() => {
      dispatch(newsActions.updateViewCount(news._id!));
    }, 10000);

    return () => {
      clearTimeout(updateLike);
    };
  }, []);

  const handleLike = () => {
    if (!user) return Toast.show({type: 'Error', text1: 'Bạn chưa đăng nhập'});
    dispatch(
      newsActions.updateLikeCount({newsId: news._id!, userId: user?._id!}),
    );
    setLiked(!liked);
  };

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
          <Icon
            onPress={handleLike}
            name={`thumb-up${liked ? '' : '-off-alt'}`}
            color={mainColor}
          />
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
