import React from 'react';
import {BaseToast, ToastProps} from 'react-native-toast-message';
import {StyleSheet} from 'react-native';
import {error, info, subColor, warning} from '../constants/colors';
import {Icon} from '@rneui/themed';

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{...styles.toast, borderColor: subColor}}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderLeadingIcon={() => (
        <Icon
          name="check-circle-outline"
          color={subColor}
          style={{paddingVertical: 15, paddingLeft: 10}}
        />
      )}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: '400',
      }}
    />
  ),
  info: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{...styles.toast, borderColor: info}}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderLeadingIcon={() => (
        <Icon
          name="error-outline"
          color={info}
          style={{paddingVertical: 15, paddingLeft: 10}}
        />
      )}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: '400',
      }}
    />
  ),
  warning: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{...styles.toast, borderColor: warning}}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderLeadingIcon={() => (
        <Icon
          name="warning-amber"
          color={warning}
          style={{paddingVertical: 15, paddingLeft: 10}}
        />
      )}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{...styles.toast, borderColor: error}}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderLeadingIcon={() => (
        <Icon
          name="do-not-disturb-alt"
          color={error}
          style={{paddingVertical: 15, paddingLeft: 10}}
        />
      )}
      text1Style={{
        fontSize: 15,
        fontWeight: '600',
      }}
      text2Style={{
        fontSize: 13,
        fontWeight: '400',
      }}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    elevation: 5,
    borderWidth: 1,
    width: 'auto',
  },
});
