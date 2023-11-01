import {View, FlatList, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {styles} from './styles';
import StoreItem from './components/StoreItem';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {shopActions} from '../../actions/shopActions';

export default function Store() {
  const [refreshing, setRefreshing] = useState(false);
  const stores = useAppSelector(state => state.shop.shops);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const fetchStore = async () => {
    setRefreshing(true);
    try {
      await dispatch(shopActions.gets());
      setRefreshing(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  const handleRefresh = () => {
    fetchStore();
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={<Icon name="search" color={mainColor} size={30} />}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <FlatList
        contentContainerStyle={styles.storeList}
        horizontal={false}
        refreshControl={
          <RefreshControl
            tintColor={mainColor}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        numColumns={2}
        data={stores}
        keyExtractor={item => item._id!}
        renderItem={({item}) => (
          <StoreItem store={item} navigation={navigation} />
        )}
      />
    </View>
  );
}
