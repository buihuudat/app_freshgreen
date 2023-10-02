import {View, FlatList} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../redux/hooks';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {styles} from './styles';
import StoreItem from './components/StoreItem';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';

export default function Store() {
  const stores = useAppSelector(state => state.shop.shops);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
