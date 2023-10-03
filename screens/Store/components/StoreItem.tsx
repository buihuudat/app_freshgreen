import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {ShopType} from '../../../types/shopType';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {styles} from '../styles';
import {Card} from '@rneui/themed';
import {Store} from '../../../constants/images';

interface Props {
  store: ShopType;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const StoreItem = memo((props: Props) => {
  const {store, navigation} = props;

  const storeImage = store.image ? {uri: store.image} : Store;
  const handleViewStore = () => {
    navigation.navigate('StoreDetails', {storeId: store._id!});
  };

  return (
    <Card containerStyle={styles.storeItem}>
      <TouchableOpacity onPress={handleViewStore}>
        <Card.Image style={styles.image} source={storeImage} />
        <Card.Title style={styles.title}>{store.name}</Card.Title>
      </TouchableOpacity>
    </Card>
  );
});

export default StoreItem;
