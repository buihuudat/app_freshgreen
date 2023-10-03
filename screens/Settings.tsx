import {View, Text} from 'react-native';
import React from 'react';
import {Header, Icon} from '@rneui/themed';
import {mainColor} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Header
        barStyle="dark-content"
        backgroundColor={'transparent'}
        leftComponent={
          <Icon
            color={mainColor}
            name="arrow-back-ios"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
