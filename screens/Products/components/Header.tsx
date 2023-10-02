import React from 'react';
import {Header as HeaderRN, Icon} from '@rneui/themed';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {mainColor} from '../../../constants/colors';
import {RootStackParamList} from '../../../routes';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const Header = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <HeaderRN
      style={styles.container}
      backgroundColor={'transparent'}
      centerComponent={
        <View style={styles.inputSubContainer}>
          <Icon name="search" size={22} color={mainColor} />
          <TextInput
            placeholder="Tìm kiếm"
            // placeholderTextColor={mainColor}
            selectionColor={mainColor}
            style={styles.inputText}
            onPressIn={() => navigation.push('Search')}
          />
        </View>
      }
      rightComponent={
        <TouchableOpacity onPress={() => navigation.push('Categories')}>
          <Icon name="menu" color={mainColor} size={30} />
        </TouchableOpacity>
      }
    />
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {},
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 5,
    borderColor: mainColor,
  },
  inputText: {
    fontSize: 18,
    color: 'black',
    flex: 1,
    padding: 0,
  },
});
