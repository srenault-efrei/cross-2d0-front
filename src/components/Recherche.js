import React from 'react'
import { View, SafeAreaView, FlatList } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import {CheckBox, Text, Slider } from 'react-native-elements'
import styles from '../../assets/css/search.js'
import global from '../../assets/css/global.js'
import { TextInput, Button } from 'react-native-paper';


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

  render() {
  return (
    <SafeAreaView style={styles.bdy}>
      <MyHeader type='Profile' />
      <View style={global.circle}>
        <Text>IMG</Text>
        <Text>Profile</Text>
      </View>
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
        <TextInput
          mode='outlined'
          label='Catégorie'
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
          style={{marginTop:10}}
        />
        <View style={{marginTop:40}}>
          <FlatList
              data={this.DATA}
              renderItem={({ item }) => (
                  <View style={global.filters}>
                      <CheckBox
                          center
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          checked={this.state.checked}
                      />
                      <Text style={global.filterText}>{item.title}</Text>
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
    </SafeAreaView>
  )
  }
}