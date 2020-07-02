import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, Button } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/home.js'
import {Card} from 'react-native-elements'
import global from '../../assets/css/global.js'


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

  componentDidMount = async () => {
    this.fetchTrocs()
  }

  redirect(page, data){
    if (data !=  ''){
      this.navigation.navigate(page, data)
    } else {
      this.navigation.navigate(page)
    }
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
          trocs: json.data.ticket
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
  return (
    <SafeAreaView style={styles.bdy}>
      <MyHeader type='Classic' navigation={this.navigation} />
      <View style={global.circle}>
                    <TouchableOpacity
                        onPress={() => this.navigation.navigate("Profil")} >
                        <Text>IMG</Text>
                        <Text>Profile</Text>
                    </TouchableOpacity>
                </View>
      <View style={styles.container}>
        <FlatList
          data={this.state.trocs}
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