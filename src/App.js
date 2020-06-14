import { registerRootComponent } from 'expo';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Search from './components/Recherche'
import Header from './components/headers/Header'
import Footer from './components/footers/Footer'
import Filters from './components/Filters'

function App() {
    return (
      <Home></Home>
    );
}

export default registerRootComponent(App)