import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  AsyncStorage
} from 'react-native'
import styles from '../../assets/styles/profilCusto'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import { Avatar } from 'react-native-elements'


export default class Profil extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      tickets: {},
      associations: {},
      histories: {},
      rank: {},
      token: "",
      id: -1
    }
  }

  async componentDidMount() {
    await this.setDataStorage()
    this.fetchUser()
    this.fetchAllAsso()
    this.unsubscribe()
  }

  async setDataStorage() {
    let data = await AsyncStorage.getItem('data')
    data = JSON.parse(data)

    this.setState({
      token: data.meta.token,
    })
    data.customer ? this.setState({ typeUser: "customer",id: data.customer.id }) : this.setState({ typeUser: "association", id: data.association.id })
  }

  unsubscribe = () => {
    this.props.navigation.addListener('focus',async () => {
      await this.setDataStorage()
      this.fetchUser()
      this.fetchAllAsso();
    })
  }

  async componentWillUnmount() {
    this.unsubscribe();

  }

  fetchUser = async () => {

    const settings = {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await fetch(`https://trocify.herokuapp.com/api/${this.state.typeUser}s/${this.state.id}`, settings);
      const json = await response.json();

      if (this.state.typeUser === 'customer') {
        this.setState({ tickets: json.data.customer["tickets"], user: json.data.customer, rank: json.data.customer["rank"] })

      } else {
        this.setState({ user: json.data.association })
      }
      // console.log(json)
    } catch (e) {
      console.log(e)
    }
  }


  fetchAllAsso = async () => {
    const settings = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      }
    };

    try {
      const response = await fetch("https://trocify.herokuapp.com/api/associations", settings);
      const json = await response.json();
      this.setState({ associations: json.data })
      // console.log(this.state.associations)
    } catch (e) {
      console.log(e)
    }
  }



  render() {
    const { navigation } = this.props
    const { user, rank, associations, tickets, typeUser, token} = this.state
    let avatar = this.state.user.avatarFile === null ? "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" : this.state.user.avatarFile

    return (
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <MyHeader type='Profile' navigation={navigation} />


        <View style={{ alignItems: "center", top: 30, position: 'absolute', zIndex: 1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            rounded
            size={100}
            onPress={() => navigation.navigate("Profil")}
            source={{
              uri:
                avatar,
            }}
          />
        </View>

        <View style={styles.view}>
          {/* View */}
          {typeUser == 'customer' ?
            <View style={styles.infosProfile}
            >
              <Text style={{ fontSize: 20 }}>{user.firstname} <Text style={{ fontWeight: "bold" }}>{user.lastname}</Text></Text>
              <Text style={{ fontSize: 18, color: "gray" }}>{rank.title}</Text>
              {/* <Text>Note</Text>
              <Text>4/5</Text> */}
            </View>
            : <View style={styles.infosProfile}>
              <Text style={{ fontSize: 20 }} > {user.name} </Text>
              <Text></Text>
            </View>
          }

          {typeUser == 'customer' ?
            <View style={styles.card}>
              <Image
                style={styles.cardLogo}
                source={require('../../assets/img/yen.png')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('MyBarters', { tickets: tickets })}
              >
                <Text>MES TROCS</Text>
              </TouchableOpacity>
            </View> : <View></View>}

          {typeUser == 'customer' ?
            <View style={styles.card}>
              <Image
                style={styles.cardLogo}
                source={require('../../assets/img/gift.png')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('MyDonations', { tickets: tickets })}
              >
                <Text>MES DONS</Text>
              </TouchableOpacity>
            </View> : <View></View>}

          {typeUser == 'customer' ?
            <View style={styles.card}>
              <Image
                style={styles.cardLogo}
                source={require('../../assets/img/cup.png')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('Rank', { user: user, token: token } )}
              >
                <Text>MON RANK</Text>
              </TouchableOpacity>
            </View> : <View></View>}

          {typeUser == 'customer' ?
            <View style={styles.card}>
              <Image
                style={styles.cardLogoClock}
                source={require('../../assets/img/clock.png')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('History',{ tickets: tickets })}
              >
                <Text>HISTORIQUE</Text>
              </TouchableOpacity>
            </View> : <View style={styles.cardAsso}>
              <Image
                style={styles.cardLogoClock}
                source={require('../../assets/img/gift.png')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('History',{ tickets: tickets })}
              >
                <Text>HISTORIQUE DONS</Text>
              </TouchableOpacity>
            </View>}

          {typeUser == 'customer' ?
            <View style={styles.card}>
              <Image
                style={styles.cardLogoRelation}
                source={require('../../assets/img/relationship.png')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('Associations', { associations: associations })}
              >
                <Text>LES ASSOCIATIONS</Text>
              </TouchableOpacity>
            </View> : <View></View>}
        </View>

        <View style={styles.viewEnd}>
          <View style={styles.end}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Parameter')}
            >
              <Text>PARAMETRES</Text>
            </TouchableOpacity>
          </View>
        </View>

        {typeUser === 'customer' ?
          <MyFooter type='classic' navigation={navigation} /> : <View></View>
        }
          {typeUser === 'association' ?
          <MyFooter type='association' navigation={navigation} /> : <View></View>
        }
      </SafeAreaView >
    )
  }
}
