import {View, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {Picker} from '@react-native-picker/picker';
import {ItemOptions, Price, Time} from '../../../types/SelectType';

const time: Array<ItemOptions> = [
  {
    title: 'Tùy chọn: Tất cả',
    value: Time.all,
  },
  {
    title: 'Mới nhất',
    value: Time.new,
  },
  {
    title: 'Mua nhiều nhất',
    value: Time.sellest,
  },
];

const price: Array<ItemOptions> = [
  {
    title: 'Giá: Tất cả',
    value: Price.all,
  },
  {
    title: 'Từ thất đến cao',
    value: Price.up,
  },
  {
    title: 'Từ cao đến thấp',
    value: Price.down,
  },
];

interface Props {
  timeOptions: string;
  priceOptions: string;
  setTimeOptions: (timeOptions: string) => void;
  setpriceOptions: (priceOptions: string) => void;
}
export const SelectMenu = memo((props: Props) => {
  const {
    timeOptions = time[0],
    priceOptions = price[0],
    setTimeOptions,
    setpriceOptions,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.optionItem}>
        <Picker
          selectedValue={timeOptions}
          onValueChange={itemValue => setTimeOptions(itemValue as string)}>
          {time.map(data => (
            <Picker.Item
              key={data.value}
              label={data.title}
              value={data.value}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.optionItem}>
        <Picker
          selectedValue={priceOptions}
          onValueChange={itemValue => setpriceOptions(itemValue as string)}>
          {price.map(data => (
            <Picker.Item
              key={data.value}
              label={data.title}
              value={data.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  optionItem: {
    width: '50%',
  },
});
