import { registerRootComponent } from "expo";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Profil from "./components/Profil";
import SignIn from "./components/SignIn";
import SignUpIndividual from "./components/SignUpIndividual";

import Home from "./components/Home";

console.disableYellowBox = true;
const Drawer = createDrawerNavigator();
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="SignIn"
        screenOptions={{ gestureEnabled: false }}
      >
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="SignUpIndividual" component={SignUpIndividual} />
        <Drawer.Screen name="Profil" component={Profil} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
