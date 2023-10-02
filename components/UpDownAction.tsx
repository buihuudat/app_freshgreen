import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export default function UpDownAction() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>-</Text>
      </TouchableOpacity>
      <Text>1</Text>
      <TouchableOpacity>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
