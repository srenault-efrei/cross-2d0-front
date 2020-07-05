import React from 'react'
import { View, SafeAreaView, YellowBox, TouchableOpacity, KeyboardAvoidingView, Image, ImageBackground } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/add.js'
import { TextInput, Button } from 'react-native-paper'
import _ from 'lodash'
import { Dropdown } from 'react-native-material-dropdown'
import Svg, { Path, Rect } from 'react-native-svg'
import * as ImagePicker from 'expo-image-picker'

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
    this.state = {  categories: [], filename:'', filename2: '', filename3: '' }
    this.navigation = this.props.navigation
  }

  static navigationOptions = {
    header: {
    visible: false
    }
  }

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

  Types = [ 
    { 
      value: 'Troc' 
    },
    {
      value: 'Don'
    }
   ]

  Locations = [
    { value: '' },
    { value: 'Paris' },
    { value: 'Marseille' },
    { value: 'Bordeaux' },
    { value: 'Toulouse' },
    { value: 'Nantes' },
    { value: 'Rennes' },
    { value: 'Reims' },
  ]

  componentDidMount = async () => {
    this.fetchCategories()
  }

/*   async setDataStorage() {
    let user = await AsyncStorage.getItem('user')
    let token = await AsyncStorage.getItem('token')
    if (!user) {
      this.props.navigation.navigate("SignIn")
    } 
    else if (user && token) {
        this.setState({ user, token })
    }
  } */

  fetchCategories = async () => {
    return fetch(`https://trocify.herokuapp.com/api/categories`, {
      method: 'GET',
      headers: 
      new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((json) => {
        let categories = [ { value: '' } ]
        const tab = json.data.category
        tab.map(category => {
          categories.push( { value: category.title } )
        })
        this.setState({ categories })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  uploadImage = async (id) => {

    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);


    if (pickerResult.cancelled === true) {
      return;
    } 
    else {
      if (id == 2){
        this.setState({ filename2: pickerResult.uri })
      }
      else if (id == 3){
        this.setState({ filename3: pickerResult.uri })
      } else {
        this.setState({ filename: pickerResult.uri })
      }
    }
  }

  displayImage = (id) => {
    switch (id) {
      case 1:
        if (this.state.filename === ''){
          return <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24"/><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z"/></Svg>
        } else {
          return <ImageBackground source={{ uri: this.state.filename}} style={styles.bg} />
        }
      case 2:
        if (this.state.filename2 === ''){
          return <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24"/><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z"/></Svg>
        } else {
          return <ImageBackground source={{ uri: this.state.filename2}} style={styles.bg} />
        }
      case 3:
        if (this.state.filename3 === ''){
          return <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24"/><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z"/></Svg>
        } else {
          return <ImageBackground source={{ uri: this.state.filename3}} style={styles.bg} />
        }
    }
  }

  sendTicket = () => {
    const state = this.state
    let obj = {}
    let images = []
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmMzhlYzU2LTc3NTctNDJkNy04ZjEzLWNjYTFkZjJmNzgwYyIsImZpcnN0bmFtZSI6IkZhYmlhbiIsImlhdCI6MTU5Mzc5MDg4OH0.XlRGfdRjJdOQKk7iKPCcH9PwSPhMzh5q4MOwaDYMp3s'

    if (state.filename != '') images.push(state.filename)
    if (state.filename2 != '') images.push(state.filename2)
    if (state.filename3 != '') images.push(state.filename3)

    /* Body construct */
    obj.title = state.title
    obj.type = state.type
    obj.category = state.category
    obj.description = state.description
    obj.imagesFiles = images
    obj.localisation = state.location

    /* Request */
    return fetch(`https://trocify.herokuapp.com/api/customers/3f38ec56-7757-42d7-8f13-cca1df2f780c/tickets`, {
      method: 'POST',
      headers: 
      new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(obj)
    })
      .then((response) => response.json())
      .then((json) => {
        /* navigate to home */
        console.log(json)
        this.reset()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  reset = () => {
    this.setState({
        title: '',
        type: '',
        category: '',
        description: '',
        imagesFiles: [],
        location: '',
        filename: '',
        filename2: '',
        filename3: '',
    })
  }

  categoryHandler = (category) => {
    switch (category){
      case 'Alimentation':
        this.setState({ category: 1 })
      break

      case 'Textile':
        this.setState({ category: 2 })
      break

      case 'Jouet':
        this.setState({ category: 3 })
      break

      case 'Informatique':
        this.setState({ category: 4 })
      break
    }
  }

  typeHandler = (type) => {
    switch (type){
      case 'Troc':
        this.setState({ type: 'barter' })
      break

      case 'Don':
        this.setState({ type: 'donation' })
      break
    }
  }

  /*   footerType = () => {
    if (this.state.user.type === 'customer') {
      return <MyFooter type='classic' navigation={this.navigation}/>
    } else {
      return <MyFooter type='Association' navigation={this.navigation}/>
    }
  } */

  render() {
    return (
        <SafeAreaView style={styles.bdy}>
            <MyHeader type='add' />
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={styles.bdy}
            >
              <View style={styles.container}>
                
                <View style={styles.imgContainer}>

                    <TouchableOpacity 
                      style={this.state.filename != '' ? styles.imgView : styles.bgBlue} 
                      onPress={() => this.uploadImage()}
                    >
                      {this.displayImage(1)}
                    </TouchableOpacity>
                      
                    <TouchableOpacity 
                      style={this.state.filename2 != '' ? styles.imgView : styles.bgBlue}
                      onPress={() => this.uploadImage(2)}
                    >
                      {this.displayImage(2)}
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={this.state.filename3 != '' ? styles.imgView : styles.bgBlue}
                      onPress={() => this.uploadImage(3)}
                    >
                      {this.displayImage(3)}
                    </TouchableOpacity>
                    
                </View>
                <Dropdown
                    label="Type d'objet"
                    data={this.Types}
                    onChangeText={type => this.typeHandler(type)}
                    value={this.state.type}
                />
                <TextInput
                    mode='outlined'
                    label='Titres'
                    value={this.state.text}
                    onChangeText={title => this.setState({ title })}
                    style={{marginTop:10}}
                    value={this.state.title}
                />
                <TextInput
                    mode='outlined'
                    label='Description (120 max.)'
                    multiline={true}
                    numberOfLines={4}
                    maxLength={120}
                    value={this.state.text}
                    onChangeText={description => this.setState({ description })}
                    style={{marginTop:10}}
                    value={this.state.description}
                />
                <Dropdown
                    label='Catégorie'
                    data={this.state.categories}
                    onChangeText={category => this.categoryHandler(category)}
                    value={this.state.category}
                />
                <Dropdown
                    label='Localisation'
                    data={this.Locations}
                    onChangeText={location => this.setState({ location })}
                    value={this.state.location}
                />
                <View style={styles.buttonsContainer}>
                  <Button icon="plus" mode="contained" style={styles.add} onPress={() => this.sendTicket()}>
                      Ajouter
                  </Button>
                  <Button icon="rotate-right" mode="contained" labelStyle={styles.resetLabel} style={styles.reset} onPress={() => this.reset()}>
                      Réinitialiser
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
            <MyFooter type='classic' navigation={this.navigation}/>
        </SafeAreaView>
    )
  }
}