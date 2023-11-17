import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Banner2, Logo, SplashImage} from '../constants/images';
import {black, mainColor} from '../constants/colors';
import {useAppDispatch} from '../redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes';
import {checkAuth} from '../utils/handlers/checkAuth';
import {appData} from '../utils/handlers/appData';
import {getToken} from '../utils/handlers/pushNotification';

export default function Splash() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchAppData = async () => {
    setLoading(true);
    await Promise.all([checkAuth(dispatch), appData(dispatch)]);
    setLoading(false);
    navigation.navigate('HomeTab');
  };
  useFocusEffect(
    useCallback(() => {
      fetchAppData();
    }, []),
  );

  return (
    <SafeAreaView>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground blurRadius={15} source={Banner2} style={styles.imageBg}>
        <View style={styles.content}>
          <Image alt="logo" source={Logo} style={styles.image} />

          <Text style={styles.text}>Bắt đầu mua sắp cùng</Text>
          <Text style={styles.name}>FreshGreen</Text>

          <View>{loading && <ActivityIndicator color={mainColor} />}</View>

          <Image source={SplashImage} style={styles.imageCenter} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  imageBg: {
    width: '100%',
    resizeMode: 'cover',
  },
  content: {
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
  },

  text: {
    fontSize: 30,
    paddingTop: 30,
    fontWeight: '600',
    color: black,
  },
  name: {
    fontSize: 35,
    color: mainColor,
    fontWeight: '600',
  },

  imageCenter: {
    width: 600,
    resizeMode: 'contain',
  },
});
