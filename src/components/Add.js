import React from 'react'
import { View, SafeAreaView, YellowBox, TouchableOpacity } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/add.js'
import { TextInput, Button } from 'react-native-paper'
import _ from 'lodash'
import { Dropdown } from 'react-native-material-dropdown'
import Svg, { Path, Rect } from 'react-native-svg'

YellowBox.ignoreWarnings(['componentWillReceiveProps'])
YellowBox.ignoreWarnings(['componentWillUpdate'])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('componentWillReceiveProps') <= -1) {
  _console.warn(message)
  } 
}


export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.navigation = this.props.navigation
    
  }
  static navigationOptions = {
    header: {
    visible: false
    }
  };

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
            <MyHeader type='add' />
            <View style={styles.container}>
                
                <View style={styles.imgContainer}>

                    <TouchableOpacity style={styles.image} onPress={() => console.log('Loading image camera...')}>
                        <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24"/><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z"/></Svg>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.image} onPress={() => console.log('Loading image camera...')}>
                        <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24"/><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z"/></Svg>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.image} onPress={() => console.log('Loading image camera...')}>
                        <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24"/><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z"/></Svg>
                    </TouchableOpacity>
                    
                </View>
                <Dropdown
                    label="Type d'objet"
                    data={this.Dropdown}
                    onChangeText={(item) => console.log(item)}
                />
                <TextInput
                    mode='outlined'
                    label='Titres'
                    value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                    style={{marginTop:10}}
                />
                <TextInput
                    mode='outlined'
                    label='Description (120 max.)'
                    multiline={true}
                    numberOfLines={4}
                    maxLength={120}
                    value={this.state.text}
                    onChangeText={text => this.setState({ description })}
                    style={{marginTop:10}}
                />
                <Dropdown
                    label='Catégorie'
                    data={this.Dropdown}
                    onChangeText={(item) => console.log(item)}
                />
                <Dropdown
                    label='Localisation'
                    data={this.Dropdown}
                    onChangeText={(item) => console.log(item)}
                />
                <Button icon="plus" mode="contained" style={{marginTop:5}} onPress={() => console.log('Pressed')} color='rgb(63, 81, 181)'>
                    Ajouter
                </Button>
            </View>
            <MyFooter type='classic' navigation={this.navigation}/>
        </SafeAreaView>
    )
  }
}