import {View, Text} from 'react-native';
import React from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {styles} from '../styles';

const Details = () => {
  const store = useAppSelector((state: RootState) => state.shop.shop);

  return (
    <View style={styles.details}>
      <Text style={styles.name}>{store.name}</Text>
      <Text style={styles.bio}>{store.bio}</Text>
      <Text style={{fontSize: 22, fontWeight: '600'}}>
        Thông tin thêm: {store.description}
      </Text>
      <Text style={{fontSize: 22, fontWeight: '600'}}>
        Năm thành lập: {store.startYear}
      </Text>
    </View>
  );
};

export default Details;
