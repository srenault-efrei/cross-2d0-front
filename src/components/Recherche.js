import React from 'react'
import { View, SafeAreaView, FlatList, YellowBox } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import {CheckBox, Text, Slider } from 'react-native-elements'
import styles from '../../assets/css/search.js'
import global from '../../assets/css/global.js'
import { TextInput, Button } from 'react-native-paper'
import _ from 'lodash'
import { Dropdown } from 'react-native-material-dropdown'

YellowBox.ignoreWarnings(['componentWillReceiveProps'])
YellowBox.ignoreWarnings(['componentWillUpdate'])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('componentWillReceiveProps') <= -1) {
  _console.warn(message);
  } 
}


export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { slider: 0}
    this.navigation = this.props.navigation
    
  }
  static navigationOptions = {
    header: {
    visible: false
    }
  };

  DATA = [
    {
      id: 1,
      title: 'Troc',

    },
    {
      id: 2,
      title: 'Dons',

    },
    {
      id: 3,
      title: 'Dons association',

    },
  ];


  Dropdown = [
    {
      value: '',
    },
    {
      value: 'Banana',
    }, 
    {
      value: 'Mango',
    }, 
    {
      value: 'Pear',
    }
  ]


  render() {
  return (
    <SafeAreaView style={styles.bdy}>
      <MyHeader type='Profile' />
      <View style={styles.container}>
        <TextInput
          mode='outlined'
          label='Mot clé'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <TextInput
          mode='outlined'
          label='Localisation'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          style={{marginTop:10}}
        />
        <Dropdown
          label='Catégorie'
          data={this.Dropdown}
          onChangeText={(item) => console.log(item)}
        />
        <View style={{marginTop:10}}>
          <FlatList
              contentContainerStyle={styles.filters}
              data={this.DATA}
              renderItem={({ item }) => (
                  <View style={styles.filters}>
                      <CheckBox
                          center
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          checked={this.state.checked}
                      />
                      <Text>{item.title}</Text>
                  </View>
              )}
              keyExtractor={item => item.id}
              horizontal={false}
              numColumns={3}
          />
        </View>
        <View style={styles.distanceView}>
          <Text>Distance</Text>
          <Slider
            thumbTintColor='rgb(63, 81, 181)'
            value={this.state.slider}
            onValueChange={(slider) => this.setState({ slider })}
          />
        </View>
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')} color='rgb(63, 81, 181)'>
          Rechercher
        </Button>
      </View>
      <MyFooter type='classic' navigation={this.navigation}/>
    </SafeAreaView>
  )
  }
}