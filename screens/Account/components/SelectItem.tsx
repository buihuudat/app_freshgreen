import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {darkGreen, mainColor} from '../../../constants/colors';

interface Props {
  icon: string;
  title: string;
  color?: string;
  navigation: () => void;
}

const SelectItem = (props: Props) => {
  const {icon, title, navigation} = props;
  return (
    <TouchableOpacity onPress={navigation} style={styles.item}>
      <View style={styles.item}>
        <Icon size={30} name={icon} color={props.color || mainColor} />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            color: props.color || darkGreen,
          }}>
          {title}
        </Text>
      </View>
      {title !== 'Đăng xuất' && <Icon name={'chevron-right'} color={'#888'} />}
    </TouchableOpacity>
  );
};

export default SelectItem;

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 15,
  },

  title: {
    fontWeight: '600',
    fontSize: 18,
  },
});
