import {Text, ScrollView} from 'react-native';
import React, {memo} from 'react';
import {styles} from '../styles';
import {Tab} from '@rneui/themed';
import {lightGreen} from '../../../constants/colors';
import {CategoryType} from '../../../types/categoryType';

interface Props {
  index: number;
  setIndex: (index: number) => void;
  categoriesUpdated: Array<CategoryType>;
  category?: string;
}

const TabSelect = memo((props: Props) => {
  const {index, setIndex, categoriesUpdated} = props;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tabScroll}>
      <Tab
        value={index}
        style={styles.tab}
        onChange={e => setIndex(e)}
        indicatorStyle={styles.tabIndicator}>
        {categoriesUpdated.map(category => (
          <Tab.Item
            key={category._id}
            style={styles.tabItem}
            containerStyle={active => ({
              backgroundColor: active ? lightGreen : undefined,
            })}>
            <Text style={styles.tabItemText}>{category.name}</Text>
          </Tab.Item>
        ))}
      </Tab>
    </ScrollView>
  );
});

export default TabSelect;
