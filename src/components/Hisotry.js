import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, AsyncStorage } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/home.js'
import stylesProfile from '../../assets/styles/profilCusto'
import { Card } from 'react-native-elements'

export default class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trocs: {},
      tickets: [],
      token: "",
      typeUser: ""
    }
    this.navigation = this.props.navigation
  }


  componentDidMount = async () => {
    await this.setDataStorage()
    if (this.state.typeUser === 'association') { this.fetchTicket() }
    this.unsubscribe()
  }



  async setDataStorage() {
    let data = await AsyncStorage.getItem('data')
    data = JSON.parse(data)

    this.setState({
      token: data.meta.token,
    })
    data.customer ? this.setState({ typeUser: "customer", tickets: this.props.route.params.tickets }) : this.setState({ typeUser: "association" })
  }


  unsubscribe = () => {
    this.props.navigation.addListener('focus', async () => {
      await this.setDataStorage()
      if (this.state.typeUser === 'association') { this.fetchTicket() }
    })
  }

  async componentWillUnmount() {
    this.unsubscribe();
  }


  fetchTicket = async () => {

    const settings = {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await fetch(`https://trocify.herokuapp.com/api/tickets`, settings);
      const json = await response.json();
      const tickets = json.data.ticket

      let tab = []
      for (const t of tickets) {
        if (t.type === 'donation') {
          tab.push(t)
        }
      }
      this.setState({ tickets: tab })
    } catch (e) {
      console.log(e)
    }
  }


  render() {
    return (
      <SafeAreaView style={styles.bdy}>
        <MyHeader type='Return' navigation={this.navigation} />


        <View style={styles.container}>

          <FlatList
            data={this.state.tickets}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Card>
                  <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 50 }}
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
        <MyFooter type='classic' navigation={this.navigation} />
      </SafeAreaView>
    )
  }
}