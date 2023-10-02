import {View} from 'react-native';
import React from 'react';
import {styles} from '../style';
import {Skeleton} from '@rneui/themed';

export default function ProductSkeleton() {
  return (
    <View style={styles.content}>
      <Skeleton height={140} />
      <Skeleton height={180} />
      <Skeleton height={80} />
      <Skeleton height={80} />
      <Skeleton height={80} />
      <Skeleton height={80} />
    </View>
  );
}
