import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import {styles} from '../styles';
import {moneyFormat} from '../../../utils/handlers/moneyFormat';
import {CheckBox, Divider} from '@rneui/themed';
import {voucherActions} from '../../../actions/voucherActions';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {RootState} from '../../../redux/store';
import {orderActions} from '../../../actions/orderActions';
import {Alert} from 'react-native';
import {
  OrderItemType,
  OrderStatus,
  PayMethod,
  PayStatus,
} from '../../../types/orderType';
import {addressOfUser, fullnameOfUser} from '../../../types/userType';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {ActivityIndicator} from 'react-native';
import {clearCart} from '../../../redux/slices/cartSlice';
import {mainColor} from '../../../constants/colors';

const Bill = () => {
  const [voucher, setVoucher] = useState('');
  const [payMethod, setPayMethod] = useState(0);
  const [orderLoading, setOrderLoading] = useState(false);

  const {
    voucher: {discount},
    loading: voucherLoading,
  } = useAppSelector((state: RootState) => state.voucher);
  const user = useAppSelector((state: RootState) => state.user.user);
  const {data: cart} = useAppSelector((state: RootState) => state.cart);

  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const totalPrice = useMemo(
    () =>
      cart.products.reduce((acc, cur) => (acc + cur.lastPrice) * cur.count, 0),
    [cart.products],
  );

  const deliveryCost = useMemo(
    () => (totalPrice > 50 ? 0 : 25000),
    [totalPrice],
  );

  const priceLastDiscount = useMemo(
    () => (discount ? (totalPrice * discount) / 100 : 0),
    [discount, totalPrice],
  );

  const totalPriceOrder = useMemo(
    () => totalPrice + deliveryCost - priceLastDiscount,
    [totalPrice, deliveryCost, priceLastDiscount],
  );

  const handleApplyVoucher = async () => {
    await dispatch(voucherActions.get(voucher))
      .unwrap()
      .catch((e: any) => Alert.alert('Voucher', e.error));
  };

  const handleOrder = async () => {
    if (!user?.address) {
      return Alert.alert('!', 'Cần thêm địa chỉ trước khi thanh toán');
    }

    const order: OrderItemType = {
      products: cart.products,
      totalPrice: totalPriceOrder,
      voucherUsed: {
        voucher,
        discount,
      },
      pay: {
        method: PayMethod.lastPay,
        amount: totalPriceOrder,
        status: PayStatus.pending,
      },
      status: OrderStatus.pending,
    };
    // pay online
    if (!payMethod) {
      navigation.navigate('Payment', {
        payData: {
          userId: user._id!,
          totalPrice,
          amount: totalPriceOrder,
          address: addressOfUser(user.address),
          phone: user.phone,
          email: user.email,
          nameOfUser: fullnameOfUser(user.fullname),
          discount: {
            voucher,
            discount,
          },
        },

        order: {
          ...order,
          pay: {
            ...order.pay,
            method: PayMethod.payNow,
            status: PayStatus.success,
          },
        },
      });
    } else {
      setOrderLoading(true);
      await dispatch(
        orderActions.createOrder({userId: user._id as string, order}),
      ).then(() => setOrderLoading(false));
      dispatch(clearCart());
      navigation.navigate('OrderManager');
    }
  };

  return (
    <View style={styles.bill}>
      <ScrollView>
        <View style={styles.billItem}>
          <Text style={styles.billTextItem}>Tổng đơn hàng:</Text>
          <Text style={styles.billPriceItem}>{moneyFormat(totalPrice)}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billTextItem}>Phí vận chuyển:</Text>
          <Text style={styles.billPriceItem}>{moneyFormat(deliveryCost)}</Text>
        </View>

        <View style={styles.voucher}>
          <Text style={styles.billTextItem}>Thêm mã giảm giá:</Text>
          <View style={styles.voucherForm}>
            <TextInput
              onChangeText={setVoucher}
              style={styles.input}
              placeholder="Nhập mã giảm giá..."
            />
            {voucherLoading ? (
              <ActivityIndicator color={mainColor} />
            ) : (
              <TouchableOpacity
                disabled={voucher === ''}
                onPress={handleApplyVoucher}
                style={styles.btnVoucher}>
                <Text style={styles.textBtn}>Áp dụng</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {discount > 0 && (
          <View style={styles.billItem}>
            <Text style={styles.billTextItem}>Giảm: ({discount}%)</Text>
            <Text style={styles.billDiscountItem}>
              -{moneyFormat(priceLastDiscount)}
            </Text>
          </View>
        )}
        <View style={styles.billItem}>
          <Text style={styles.billTextTotalItem}>Tổng:</Text>
          <Text style={styles.billPriceItem}>
            {moneyFormat(totalPriceOrder)}
          </Text>
        </View>

        <Divider />

        <View>
          <Text style={styles.billTextItem}>Phương thức thanh toán:</Text>
          <CheckBox
            containerStyle={{padding: 0, backgroundColor: 'transparent'}}
            checked={payMethod === 0}
            onPress={() => setPayMethod(0)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'Thanh toán trực tuyến'}
          />
          <CheckBox
            containerStyle={{padding: 0, backgroundColor: 'transparent'}}
            checked={payMethod === 1}
            onPress={() => setPayMethod(1)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title={'Thanh toán khi nhận hàng'}
          />
        </View>

        {orderLoading ? (
          <View style={styles.orderLoading}>
            <ActivityIndicator color={mainColor} />
          </View>
        ) : (
          <TouchableOpacity onPress={handleOrder} style={styles.btnOrder}>
            <Text style={styles.btnTextOrder}>
              {payMethod ? 'Đặt hàng' : 'Thanh toán'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default Bill;
