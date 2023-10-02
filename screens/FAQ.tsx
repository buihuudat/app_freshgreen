import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Icon} from '@rneui/themed';
import {black, mainColor} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {FaqDataItem} from '../redux/slices/faqSlice';
import {faqActions} from '../actions/faqActions';

const RenderItem = (item: FaqDataItem) => {
  return (
    <View>
      <Text style={styles.title}>{item.title}</Text>
      <FlatList
        data={item.cards}
        renderItem={({item: itemChild}) => (
          <View style={styles.aItem}>
            <Text style={styles.a}>{itemChild.header}</Text>
            <Text style={{paddingLeft: 5}}>-{itemChild.body}</Text>
          </View>
        )}
      />
    </View>
  );
};

const FAQ = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const faq = useAppSelector(state => state.faq.data);
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    await dispatch(faqActions.gets());
  };

  useEffect(() => {
    fetchData().then(() => setIsLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {isLoading ? (
        <ActivityIndicator color={mainColor} />
      ) : (
        <View style={styles.listProducts}>
          <FlatList
            refreshControl={
              <RefreshControl
                tintColor={mainColor}
                refreshing={refreshing}
                onRefresh={fetchData}
              />
            }
            data={faq}
            keyExtractor={item => item.title}
            renderItem={({item}) => <RenderItem {...item} />}
          />
        </View>
      )}
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listProducts: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: '600',
    color: mainColor,
  },

  aItem: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },

  a: {
    fontWeight: '600',
    fontSize: 18,
    color: black,
  },
});
