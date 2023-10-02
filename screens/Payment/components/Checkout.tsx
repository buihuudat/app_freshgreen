import {presentPaymentSheet, useStripe} from '@stripe/stripe-react-native';
import {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';
import {payActions} from '../../../actions/payActions';
import {dataStorage} from '../../../utils/handlers/dataStorage';
import {PayData} from '../../../types/paymentType';
import {styles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {useAppDispatch} from '../../../redux/hooks';
import {OrderItemType} from '../../../types/orderType';
import {orderActions} from '../../../actions/orderActions';

interface Props {
  payData: PayData;
  order: OrderItemType;
}

const Checkout = (props: Props) => {
  const {payData, order} = props;

  const {initPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [secretClient, setSecretClient] = useState<{
    id: string;
    client_secret: string;
    ephemeralKey: string;
    customer: string;
  }>({id: '', client_secret: '', ephemeralKey: '', customer: ''});

  useEffect(() => {
    const secretClient = async () => {
      try {
        const data = await payActions.payment(payData.amount);
        setSecretClient(data);
      } catch (error) {
        return false;
      }
    };
    secretClient();
  }, []);

  const initializePaymentSheet = async () => {
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Bui Huu Dat',
      customerId: secretClient.customer,
      customerEphemeralKeySecret: secretClient.ephemeralKey,
      paymentIntentClientSecret: secretClient.client_secret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: payData.nameOfUser,
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      // Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      dispatch(orderActions.createOrder({userId: payData.userId, order}));
      Alert.alert('Hoàn tất', 'Cảm ơn bạn đã mua sản phẩm!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('OrderManager');
          },
        },
      ]);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={openPaymentSheet}
      disabled={!loading}>
      <Text style={styles.textBtn}>Thanh toán</Text>
    </TouchableOpacity>
  );
};

export default Checkout;
