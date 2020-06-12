import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'

export default class Profil extends Component {
  state = {
    count: 0
  }

 
 render() {
    return (
      <View style={{ backgroundColor: "Green"}}>
       <Text style={{ fontSize: 34, textAlign: "center", color: "white" }}>Customer</Text>
      </View>
    )
  }
}
