import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native'
import styles from '../../assets/styles/profilCusto'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import global from '../../assets/css/global.js'


export default class Profil extends Component {

  constructor(props) {
    super(props)
    this.state = {
      typeUser: "",
      user: {},
      tickets: {},
      associations: {},
      histories: {},
      rank: {},
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmMzhlYzU2LTc3NTctNDJkNy04ZjEzLWNjYTFkZjJmNzgwYyIsImZpcnN0bmFtZSI6IlN0ZXZlbiIsImlhdCI6MTU5MjQxODAzOX0.lyTW0f0cJrMoiqc4yUn8xQe9Ap865_KMC_2CK-wDeoU"
    }
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchAllAsso();

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
      const response = await fetch("https://trocify.herokuapp.com/api/customers/1f38ec56-7757-42d7-8f13-cca1df2f780c", settings);
      const json = await response.json();
      this.setState({ user: json.data.customer, tickets: json.data.customer["tickets"], rank: json.data.customer["rank"], typeUser: "customer" })
      // console.log(this.state.user)
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
    const { user, rank, associations, tickets,typeUser } = this.state
    return (
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <MyHeader type='Profile' navigation={navigation}  />
        <View style={global.circle}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profil")} >
            <Text>IMG</Text>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.view}>
          {/* View */}
          {typeUser == 'customer' ?
            <View style={styles.infosProfile}
            >
              <Text>{user.firstname} {user.lastname}</Text>
              <Text>{rank.title}</Text>
              {/* <Text>Note</Text>
              <Text>4/5</Text> */}
            </View>
            : <View style={styles.infosProfile}>
              <Text> {user.name} </Text>
              <Text></Text>
            </View>
          }

          {typeUser == 'customer' ?
            <View style={styles.card}>
              <Image
                style={styles.cardLogo}
                source={require('../../assets/img/yen.png')}
              />
              <TouchableOpacity>
                <Text>MES TROCS</Text>
              </TouchableOpacity>
            </View> : <View></View>}

          {typeUser == 'customer' ?
            <View style={styles.card}>
              <Image
                style={styles.cardLogo}
                source={require('../../assets/img/gift.png')}
              />
              <TouchableOpacity>
                <Text>MES DONS</Text>
              </TouchableOpacity>
            </View> : <View></View>}

          {typeUser == 'customer' ?
            <View style={styles.card}>
              <Image
                style={styles.cardLogo}
                source={require('../../assets/img/cup.png')}
              />
              <TouchableOpacity>
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
                onPress={() => navigation.navigate('History')}
              >
                <Text>HISTORIQUE</Text>
              </TouchableOpacity>
            </View> : <View style={styles.cardAsso}>
              <Image
                style={styles.cardLogoClock}
                source={require('../../assets/img/gift.png')}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('History')}
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
                onPress={() => navigation.navigate('Associations', { associations })}
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
            <MyFooter type='classic' navigation={navigation} /> : <View></View>}
      {typeUser === 'association' ?
            <MyFooter type='Association' navigation={navigation} /> : <View></View>}
      </SafeAreaView >
    )
  }
}
