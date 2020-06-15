import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import Filters from './Filters'
import styles from '../../assets/css/home.js'
import global from '../../assets/css/global.js'
import {Card} from 'react-native-elements'



export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.navigation = this.props.navigation
    
  }
  static navigationOptions = {
    header: {
    visible: false
    }
  }

  DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',

    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',

    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',

    },
  ]

  render() {
  return (
    <SafeAreaView style={styles.bdy}>
      <MyHeader type='Profile' />
      <View style={global.circle}>
        <Text>IMG</Text>
        <Text>Profile</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={this.DATA}
          renderItem={({ item }) => (
              <TouchableOpacity>
                  <Card>
                      <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                          <Image
                            style={{width: 100, height: 100, borderRadius: 50}}
                            resizeMode="cover"
                            source={require('../../assets/img/logo.png')}
                          />
                          <Text>Hello</Text>
                      </View>
                  </Card>
              </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={2}
        />
      </View>
      <MyFooter type='classic' />
    </SafeAreaView>
  )
  }
}