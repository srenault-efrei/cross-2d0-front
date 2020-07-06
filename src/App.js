import { registerRootComponent } from 'expo';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ProfilCusto from './components/Profil'
import Associations from './components/Associations'
import DetailsAssociation from './components/DetailsAssociation'
import Parameter from './components/Parameter'
import Hisotry from './components/Hisotry'
import SignIn from './components/SignIn';
import SignUpIndividual from './components/SignUpIndividual';
import SignUpAssociation from './components/SignUpAssociation';
import ForgotPassword from './components/ForgotPassword';
import Preference from './components/Preference';
import Confidentiality from './components/Confidentiality';
import Home from './components/Home';
import Search from './components/Recherche';
import Header from './components/headers/Header';
import EditProfile from './components/EditProfil'
import Rank from './components/Rank'
import MyBarters from './components/MyBarters'
import MyDonations from './components/MyDonations'
import DetailTickets from './components/DetailTickets'
import EditTickets from './components/EditTickets'

import Add from './components/Add'
import Product from './components/ProductDetails'
import Map from './components/Map'
import MessageList from './components/MessageList'
import MessageBox from './components/MessageBox'

// console.disableYellowBox = true;
const Drawer = createDrawerNavigator()
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="SignIn" screenOptions={{ gestureEnabled: false }}>
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="Header" component={Header} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="SignUpIndividual" component={SignUpIndividual} />
        <Drawer.Screen name="SignUpAssociation" component={SignUpAssociation} />
        <Drawer.Screen name="ForgotPassword" component={ForgotPassword} />
        <Drawer.Screen name="Preference" component={Preference} />
        <Drawer.Screen name="Confidentiality" component={Confidentiality} />
        <Drawer.Screen name="Profil" component={ProfilCusto} />
        <Drawer.Screen name="Associations" component={Associations} />
        <Drawer.Screen name="DetailsAssociation" component={DetailsAssociation} />
        <Drawer.Screen name="Parameter" component={Parameter} />
        <Drawer.Screen name="History" component={Hisotry} />
        <Drawer.Screen name="EditProfile" component={EditProfile} />
        <Drawer.Screen name="Rank" component={Rank} />
        <Drawer.Screen name="MyBarters" component={MyBarters} />
        <Drawer.Screen name="MyDonations" component={MyDonations} />
        <Drawer.Screen name="Add" component={Add} />
        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="ProductDetails" component={Product} />
        <Drawer.Screen name="EditTickets" component={EditTickets} />
        <Drawer.Screen name="DetailTickets" component={DetailTickets} />
        <Drawer.Screen name="Messages" component={MessageList} />
        <Drawer.Screen name="Messages Box" component={MessageBox} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App)