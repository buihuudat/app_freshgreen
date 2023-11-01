import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {PayData} from '../../../types/paymentType';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {useAppDispatch} from '../../../redux/hooks';
import {OrderItemType} from '../../../types/orderType';
import {orderActions} from '../../../actions/orderActions';
import Toast from 'react-native-toast-message';
import {SecretClientProps} from '..';
import {REACT_APP_STRIPE_PUBLISHABLE_KEY} from '@env';
import {mainColor} from '../../../constants/colors';
import {clearCart} from '../../../redux/slices/cartSlice';

interface Props {
  payData: PayData;
  order: OrderItemType;
  secretClient: SecretClientProps;
}

const Checkout = (props: Props) => {
  const {payData, order, secretClient} = props;
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async () => {
    try {
      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Bui Huu Dat',
        customerId: secretClient.customer,
        customerEphemeralKeySecret: secretClient.ephemeralKey,
        paymentIntentClientSecret: secretClient.client_secret,
        applePay: {
          merchantCountryCode: 'VN',
        },
        googlePay: {
          merchantCountryCode: 'VN',
          testEnv: true,
          currencyCode: 'vnd',
        },
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: payData.nameOfUser,
          phone: payData.phone,
          email: payData.email,
          address: {
            line1: payData.address,
          },
        },
      });
      if (!error) {
        setLoading(true);
      }
    } catch (error) {
      console.error('Initialization Error:', error);
    }
  };

  const handlePaymentSheet = async () => {
    try {
      const {error} = await presentPaymentSheet();

      if (error) {
        // throw new Error('Payment Sheet Error');
        console.log(error);
      } else {
        dispatch(orderActions.createOrder({userId: payData.userId, order}));
        dispatch(clearCart());
        navigation.replace('OrderManager');
        Toast.show({type: 'success', text1: 'Cảm ơn bạn đã mua sản phẩm!'});
      }
    } catch (error) {
      console.error('Payment Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Có lỗi xảy ra trong quá trình thanh toán',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <StripeProvider
        publishableKey={REACT_APP_STRIPE_PUBLISHABLE_KEY}
        merchantIdentifier="merchant.com.freshgreen"
        urlScheme="freshgreen">
        <TouchableOpacity
          style={{...styles.btn, backgroundColor: loading ? mainColor : '#999'}}
          disabled={!loading}
          onPress={handlePaymentSheet}>
          <Text style={styles.textBtn}>Thanh toán</Text>
        </TouchableOpacity>
      </StripeProvider>
    </View>
  );
};

export default Checkout;
