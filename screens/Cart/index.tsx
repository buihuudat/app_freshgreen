import {View, Text} from 'react-native';
import React from 'react';
import {Divider, Header, Icon} from '@rneui/themed';
import {mainColor, thirColor} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../routes';
import {useAppSelector} from '../../redux/hooks';
import ProductsList from './components/ProductsList';
import {styles} from './styles';
import Bill from './components/Bill';
import {RootState} from '../../redux/store';

export default function Cart() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {data} = useAppSelector((state: RootState) => state.cart);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon
            name="arrow-back-ios"
            color={mainColor}
            onPress={() => navigation.goBack()}
          />
        }
        centerComponent={<Text style={styles.title}>Giỏ hàng</Text>}
        rightComponent={
          <Text style={{fontWeight: '700', color: thirColor}}>
            SL: {data.products.length}
          </Text>
        }
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ProductsList products={data.products} />

      <Divider />

      {data.products.length > 0 && <Bill />}
    </View>
  );
}
