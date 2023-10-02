import React, {ReactNode} from 'react';
import {mainColor} from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, View} from 'react-native';

const Sav = ({children}: {children: ReactNode}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={mainColor} barStyle={'light-content'} />
      {children}
    </SafeAreaView>
  );
};

export default Sav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
