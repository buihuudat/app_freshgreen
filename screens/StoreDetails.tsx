import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';

type Props = NativeStackScreenProps<RootStackParamList, 'StoreDetails'>;

export default function StoreDetails({route, navigation}: Props) {
  return (
    <View>
      <Text>StoreDetails</Text>
    </View>
  );
}
