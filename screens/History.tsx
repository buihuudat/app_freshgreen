import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import {useAppSelector} from '../redux/hooks';
import {RootState} from '../redux/store';
import {OrderStatus} from '../types/orderType';
import OrderItem from '../components/OrderItem';
import {useNavigation} from '@react-navigation/native';

const History = () => {
  const orders = useAppSelector((state: RootState) => state.order.data);

  const navigation = useNavigation();

  const orderDone = useMemo(
    () => orders.filter(order => order.status === OrderStatus.done).reverse(),
    [orders],
  );

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={'transparent'}
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={
          <Text style={styles.headerCenter}>{orderDone.length} đơn hàng</Text>
        }
      />

      {orderDone.length ? (
        <FlatList
          data={orderDone}
          keyExtractor={item => item._id!}
          renderItem={({item}) => <OrderItem {...item} />}
        />
      ) : (
        <Text>Bạn chưa có đơn hàng</Text>
      )}
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerCenter: {
    fontSize: 20,
    fontWeight: '600',
  },
});
