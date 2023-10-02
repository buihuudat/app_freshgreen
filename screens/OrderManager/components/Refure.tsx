import {View, FlatList} from 'react-native';
import React, {useMemo} from 'react';
import {useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {OrderStatus} from '../../../types/orderType';
import OrderItem from '../../../components/OrderItem';

const Refure = () => {
  const orders = useAppSelector((state: RootState) => state.order.data);

  const orderPending = useMemo(
    () => orders.filter(order => order.status === OrderStatus.refuse),
    [orders],
  );

  return (
    <View>
      <FlatList
        data={orderPending}
        renderItem={({item}) => <OrderItem {...item} />}
      />
    </View>
  );
};

export default Refure;
