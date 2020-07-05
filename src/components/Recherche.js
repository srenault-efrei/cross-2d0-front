import React from 'react'
import { View, SafeAreaView, FlatList, YellowBox, KeyboardAvoidingView } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import {CheckBox, Text, Slider } from 'react-native-elements'
import styles from '../../assets/css/search.js'
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
    this.state = { slider: 0, checked: false }
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

  reset = () => {
    this.setState({
        checked: false,
        keyword: '',
        category: '',
        location: '',
        slider: 0
    })
  }

  search = () => {
    const {keyword, location, category, isChecked, slider} = this.state
    let search = {}

    /* Search construct */
    search.keyword = keyword
    search.slider = slider
    search.category = category
    search.type = isChecked
    search.location = location

    /* Request */
    this.navigation.navigate('Home', {obj: search})
    this.reset()
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
      <MyHeader type='backClassic' navigation={this.navigation}/>
      <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              style={styles.bdy}
      >
        <View style={styles.container}>
        <TextInput
          mode='outlined'
          label='Mot clé'
          value={this.state.keyword}
          onChangeText={keyword => this.setState({ keyword })}
        />
        <TextInput
          mode='outlined'
          label='Localisation'
          value={this.state.location}
          onChangeText={location => this.setState({ location })}
          style={{marginTop:10}}
        />
        <Dropdown
          label='Catégorie'
          data={this.state.categories}
          onChangeText={(category) => this.categoryHandler(category)}
          value={this.state.category}
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
          <View style={styles.buttonsContainer}>
              <Button icon="rotate-right" mode="contained" labelStyle={styles.resetLabel} style={styles.reset} onPress={() => this.reset()}>
                  Réinitialiser
              </Button>
              <Button icon="magnify" mode="contained" style={styles.search} onPress={() => this.search()}>
                  Rechercher
              </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
      <MyFooter type='classic' navigation={this.navigation}/>
    </SafeAreaView>
  )
  }
}