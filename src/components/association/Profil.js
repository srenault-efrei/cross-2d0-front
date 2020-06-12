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
      <View style={{ backgroundColor: "blue"}}>
       <Text style={{ fontSize: 34, textAlign: "center", color: "white" }}>Association</Text>
      </View>
    )
  }
}
