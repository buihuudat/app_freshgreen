import {StyleSheet, Dimensions} from 'react-native';
import React, {ReactNode} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {Platform} from 'react-native';

const KeyboardScroll = ({children}: {children: ReactNode}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardScroll;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
  },
});
