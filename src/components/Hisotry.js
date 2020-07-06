import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, AsyncStorage } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/home.js'
import { Card,Avatar } from 'react-native-elements'

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

        <View style={{ alignItems: "center", top: 40, position: 'absolute', zIndex: 1, alignSelf: 'center', justifyContent: 'center' }}>
          <Avatar
            rounded
            size={100}
            onPress={(() => this.props.navigation.navigate("Profil"))}
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            }}

          />
        </View>
        <View style={styles.container}>

          <FlatList
            data={this.state.tickets}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Card>
                <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: 100,maxHeight:110}}>
                    <Image
                      style={{ width: 100, height: 100, borderRadius: 50 }}
                      resizeMode="cover"
                      source={{uri: item.imagesFiles.length != 0 ? item.imagesFiles[0] : 'https://www.fri.ch/site_2015/wp-content/plugins/ajax-search-pro/img/default.jpg'}}
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
        {this.state.typeUser === 'customer' ?
          <MyFooter type='classic' navigation={this.navigation} /> : <View></View>
        }
          {this.state.typeUser === 'association' ?
          <MyFooter type='association' navigation={this.navigation} /> : <View></View>
        }
      </SafeAreaView>
    )
  }
}