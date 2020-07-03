import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, YellowBox  } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/home.js'
import {Card} from 'react-native-elements'
import _ from 'lodash'

YellowBox.ignoreWarnings(['componentWillReceiveProps'])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('componentWillReceiveProps') <= -1) {
  _console.warn(message);
  } 
}

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: '', data: [] }
    this.navigation = this.props.navigation
    this.searchHandler = this.searchHandler.bind(this)
  }

  dataSave = []

  static navigationOptions = {
    header: {
      visible: false
    }
  }

  componentDidMount = async () => {
    this.fetchTrocs()
  }

  componentWillReceiveProps() {
    this.getTickets()
  }

  /* Handlers */
  getTickets = () => {
    if (this.props.route.params){
      /* this.search(this.props.route.params) */
      console.log(this.props.route.params)
    } else {
      console.log(this.props.route.params)
    }
  }

  searchHandler(text) {
    const newData = this.dataSave.filter(item => {
      const itemData = item.title.toLowerCase()
      const textData = text.toLowerCase()
      return itemData.indexOf(textData) > -1
    })

    this.setState({
      data: newData
    })
  }
  /*  */

  async setDataStorage() {
    let user = await AsyncStorage.getItem('user')
    let token = await AsyncStorage.getItem('token')
    if (!user) {
      this.props.navigation.navigate("SignIn")
    } 
    else if (user && token) {
        this.setState({ user, token })
    }
  }

  redirect(page, data){
    if (data !=  ''){
      this.navigation.navigate(page, data)
    } else {
      this.navigation.navigate(page)
    }
  }

  search = (data) => {
    const newData = this.dataSave.filter(item => {
      const itemTitle = item.title.toLowerCase()
      const itemCategory = item.category.title.toLowerCase()
      const itemType = item.type.toLowerCase()
      const itemLocation = item.localisation.toLowerCase()
      const textData = text.toLowerCase()
      if (itemTitle.indexOf(data.keyword.toLowerCase()) || itemCategory === data.category.id || itemType === data.type.toLowerCase() || itemLocation === data.location.toLowerCase()){
        return item
      }
    })

    this.setState({
      data: newData
    })
  }

  fetchTrocs = async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmMzhlYzU2LTc3NTctNDJkNy04ZjEzLWNjYTFkZjJmNzgwYyIsImZpcnN0bmFtZSI6IkZhYmlhbiIsImlhdCI6MTU5Mjc2NTQ5NX0.PM01TGuPKYB3AW2mEJYRrjna9LhggRp1w-oZsLx-8ZA'
    return fetch(`https://trocify.herokuapp.com/api/tickets`, {
      method: 'GET',
      headers: 
      new Headers({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json.data.ticket
        })
        this.dataSave = json.data.ticket
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
  return (
    <SafeAreaView style={styles.bdy}>
      <MyHeader type='classic' navigation={this.navigation} search={this.searchHandler}/>
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          showsVerticalScrollIndicator ={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.redirect('ProductDetails', {product: item})}>
                  <Card>
                      <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                          <Image
                            style={{width: 100, height: 100, borderRadius: 50}}
                            resizeMode="cover"
                            source={require('../../assets/img/logo.png')}
                          />
                          <Text>{item.title}</Text>
                      </View>
                  </Card>
              </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={2}
        />
      </View>
      <MyFooter type='classic' navigation={this.navigation}/>
    </SafeAreaView>
  )
  }
}