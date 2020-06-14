import { registerRootComponent } from 'expo';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ProfilCusto from './components/Profil'
import Associations from './components/Associations'
import DetailsAssociation from './components/DetailsAssociation'
import Parameter from './components/Parameter'
import Hisotry from './components/Hisotry'


const Drawer = createDrawerNavigator()

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ProfilCusto" screenOptions={{ gestureEnabled: false}}>
        <Drawer.Screen name="ProfilCusto" component={ProfilCusto} />
        <Drawer.Screen name="Associations" component={Associations} />
        <Drawer.Screen name="DetailsAssociation" component={DetailsAssociation} />
        <Drawer.Screen name="Parameter" component={Parameter} />
        <Drawer.Screen name="History" component={Hisotry} />


      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App)