import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import Checkout from './components/Checkout';
import {styles} from './styles';
import Bill from './components/Bill';
import {payActions} from '../../actions/payActions';
import {ActivityIndicator} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

export interface SecretClientProps {
  id: string;
  client_secret: string;
  ephemeralKey: string;
  customer: string;
}

const Payment = ({route, navigation}: Props) => {
  const {payData} = route.params;
  const [loading, setLoading] = useState(true);
  const [secretClient, setSecretClient] = useState<SecretClientProps>({
    id: '',
    client_secret: '',
    ephemeralKey: '',
    customer: '',
  });

  useEffect(() => {
    setLoading(true);
    const secretClient = async () => {
      try {
        const data = await payActions.payment(payData.amount);
        setSecretClient(data);
      } catch (error) {
        return false;
      } finally {
        setLoading(false);
      }
    };
    secretClient();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        barStyle="dark-content"
        backgroundColor="transparent"
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
            size={28}
          />
        }
        centerComponent={
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
            }}>
            Thanh toán
          </Text>
        }
        rightComponent={
          <Icon
            name="home"
            color={mainColor}
            onPress={() => navigation.navigate('HomeTab')}
            size={28}
          />
        }
      />

      <Bill {...route.params} />

      {loading ? (
        <ActivityIndicator color={mainColor} />
      ) : (
        <Checkout {...route.params} secretClient={secretClient} />
      )}
    </View>
  );
};

export default Payment;
