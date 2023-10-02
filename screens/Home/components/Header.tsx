import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Badge, Header as HeaderRNE, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes';
import {useAppSelector} from '../../../redux/hooks';
import {mainColor} from '../../../constants/colors';
import CartIcon from '../../../components/CartIcon';

const Header = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useAppSelector(state => state.user.user);
  return (
    <HeaderRNE
      barStyle="dark-content"
      backgroundColor="transparent"
      leftComponent={<Text style={styles.headerLeftText}>FreshGreen</Text>}
      rightComponent={
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.push('Search')}>
            <Icon name="search" color={mainColor} size={28} />
          </TouchableOpacity>
          {user && (
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <CartIcon />
            </TouchableOpacity>
          )}
          {user && (
            <TouchableOpacity onPress={() => navigation.push('Message')}>
              <Badge
                value={1}
                status="error"
                containerStyle={{
                  position: 'absolute',
                  right: -7,
                  top: -10,
                  zIndex: 2,
                }}
              />
              <Icon name="message" color={mainColor} size={28} />
            </TouchableOpacity>
          )}
        </View>
      }
      centerComponent={{}}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    gap: 20,
    flexDirection: 'row',
  },
  headerLeftText: {
    fontWeight: '700',
    fontSize: 23,
    width: 200,
    color: mainColor,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Header;
