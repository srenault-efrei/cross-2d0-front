import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'

export default class Home extends Component {
  state = {
    count: 0
  }

 
 render() {
    return (
      <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
       <Text style={{ fontSize: 34}}>Go to Profil</Text>
      </View>
    )
  }
}
