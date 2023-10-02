import {View, Text} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../../constants/colors';
import {StripeProvider} from '@stripe/stripe-react-native';
import Checkout from './components/Checkout';
import {styles} from './styles';
import Bill from './components/Bill';
import {REACT_APP_STRIPE_PUBLISHABLE_KEY} from '@env';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

const Payment = ({route, navigation}: Props) => {
  return (
    <StripeProvider
      publishableKey={REACT_APP_STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.identifier"
      urlScheme="your-url-scheme">
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

        <Checkout {...route.params} />
      </View>
    </StripeProvider>
  );
};

export default Payment;
