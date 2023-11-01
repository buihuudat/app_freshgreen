import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';

const RootDrawer = createDrawerNavigator();

export default function Drawer() {
  return (
    <RootDrawer.Navigator>
      <RootDrawer.Screen name="Home" component={Home} />
    </RootDrawer.Navigator>
  );
}
