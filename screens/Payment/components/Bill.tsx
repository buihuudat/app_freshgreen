import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import {moneyFormat} from '../../../utils/handlers/moneyFormat';
import {Divider, Icon} from '@rneui/themed';
import moment from 'moment';
import {mainColor} from '../../../constants/colors';
import {PayData} from '../../../types/paymentType';
import {OrderItemType} from '../../../types/orderType';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';

interface Props {
  payData: PayData;
  order: OrderItemType;
}

const Bill = (props: Props) => {
  const {payData, order} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const totalProduct = order.products.reduce((inc, ac) => inc + ac.count, 0);

  return (
    <View style={styles.bill}>
      <View style={styles.topBill}>
        <Text style={styles.dateText}>{moment().format('LLLL')}</Text>
        <Icon
          name="drive-file-rename-outline"
          color={mainColor}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <Text style={styles.billTitle}>Thông tin Hóa đơn</Text>

      <View style={styles.billItem}>
        <Text style={styles.billTextItem}>Tên khách hàng:</Text>
        <Text style={styles.billInfoItem}>{payData.nameOfUser}</Text>
      </View>
      <View style={styles.billItem}>
        <Text style={styles.billTextItem}>Số điện thoại:</Text>
        <Text style={styles.billInfoItem}>{payData.phone}</Text>
      </View>
      <View style={styles.billItem}>
        <Text style={styles.billTextItem}>Email:</Text>
        <Text style={styles.billInfoItem}>{payData.email}</Text>
      </View>
      <View style={styles.billItem}>
        <Text style={styles.billTextItem}>Địa chỉ:</Text>
        <Text style={styles.billInfoItem}>{payData.address}</Text>
      </View>

      <Divider />

      <View style={styles.billItem}>
        <Text style={styles.billTextItem}>Số lượng sản phẩm:</Text>
        <Text style={styles.billPriceItem}>{totalProduct}</Text>
      </View>
      {order.voucherUsed.discount > 0 && (
        <View style={styles.billItem}>
          <Text style={styles.billTextItem}>Giảm giá:</Text>
          <Text style={styles.billPriceItem}>
            {order.voucherUsed.discount}%
          </Text>
        </View>
      )}
      <View style={styles.billItem}>
        <Text style={styles.billTextItem}>Phương thức thanh toán:</Text>
        <Text style={styles.billPriceItem}>Thanh toán online</Text>
      </View>

      <Divider />

      <View style={styles.billItem}>
        <Text style={styles.textPay}>Tổng thanh toán:</Text>
        <Text style={styles.textPricePay}>{moneyFormat(order.totalPrice)}</Text>
      </View>
    </View>
  );
};

export default Bill;
