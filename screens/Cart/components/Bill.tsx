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
import {info, mainColor} from '../../../constants/colors';
import Toast from 'react-native-toast-message';
import {ProductCartType} from '../../../types/cartType';

const Bill = () => {
  const {data: cart} = useAppSelector((state: RootState) => state.cart);
  const user = useAppSelector((state: RootState) => state.user.user);

  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucher, setVoucher] = useState('');
  const [payMethod, setPayMethod] = useState(0);
  const [orderLoading, setOrderLoading] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState(0);

  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const totalPrice = useMemo(
    () =>
      cart.products.reduce(
        (acc: number, cur: ProductCartType) =>
          (acc + cur.lastPrice) * cur.count,
        0,
      ),
    [cart.products],
  );

  const deliveryCost = useMemo(
    () => (totalPrice > 50 ? 0 : 25000),
    [totalPrice],
  );

  const priceLastDiscount = useMemo(
    () => (currentDiscount ? (totalPrice * currentDiscount) / 100 : 0),
    [currentDiscount, totalPrice],
  );

  const totalPriceOrder = useMemo(
    () => totalPrice + deliveryCost - priceLastDiscount,
    [totalPrice, deliveryCost, priceLastDiscount],
  );

  const handleApplyVoucher = async () => {
    setVoucherLoading(true);
    await dispatch(voucherActions.get(voucher))
      .unwrap()
      .then(data => setCurrentDiscount(data.discount))
      .catch((e: any) => {
        Toast.show({type: 'error', text1: e.error});
        setCurrentDiscount(0);
      })
      .finally(() => {
        setVoucherLoading(false);
      });
  };

  const handleOrder = async () => {
    if (!user?.address) {
      return Toast.show({
        type: 'warning',
        text1: 'Cần thêm địa chỉ trước khi thanh toán',
      });
    }

    const order: OrderItemType = {
      products: cart.products,
      totalPrice: totalPriceOrder,
      voucherUsed: {
        voucher,
        discount: currentDiscount,
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
          address: addressOfUser(user.address)!,
          phone: user.phone,
          email: user.email,
          nameOfUser: fullnameOfUser(user.fullname),
          discount: {
            voucher,
            discount: currentDiscount,
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
      <ScrollView style={{paddingHorizontal: 10}}>
        <View style={styles.billItem}>
          <Text style={styles.billTextItem}>Tổng đơn hàng:</Text>
          <Text style={styles.billPriceItem}>{moneyFormat(totalPrice)}</Text>
        </View>
        <View style={styles.billItem}>
          <Text style={styles.billTextItem}>Phí vận chuyển:</Text>
          <Text style={styles.billPriceItem}>{moneyFormat(deliveryCost)}</Text>
        </View>

        <View style={styles.billItem}>
          <Text style={styles.billTextItem}>Số điện thoại nhận hàng:</Text>
          <Text style={styles.billPriceItem}>{user?.phone}</Text>
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
          <View style={styles.billItem}>
            <Text style={styles.billTextItem}>Địa chỉ nhận hàng:</Text>
            {addressOfUser(user?.address!) ? (
              <Text style={{...styles.billPriceItem, flex: 1}}>
                {addressOfUser(user?.address!)}
              </Text>
            ) : (
              <Text
                onPress={() => navigation.navigate('Profile')}
                style={{
                  fontStyle: 'italic',
                  fontSize: 18,
                  fontWeight: '600',
                  color: info,
                }}>
                Thêm địa chỉ
              </Text>
            )}
          </View>
        </View>

        {currentDiscount > 0 && (
          <View style={styles.billItem}>
            <Text style={styles.billTextItem}>Giảm: ({currentDiscount}%)</Text>
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
