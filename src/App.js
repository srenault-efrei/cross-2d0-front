import { registerRootComponent } from 'expo';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './components/Home';
import ProfilAsso from './components/association/Profil'
import ProfilCusto from './components/customer/Profil'

const Drawer = createDrawerNavigator()

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{ gestureEnabled: false}}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="ProfilAsso" component={ProfilAsso} />
        <Drawer.Screen name="ProfilCusto" component={ProfilCusto} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App)