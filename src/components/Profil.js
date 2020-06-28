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
import { Avatar } from 'react-native-elements'


export default class Profil extends Component {

  constructor(props) {
    super(props)
    this.state = {
      typeUser: "customer",
      user: {},
      tickets: {},
      associations: {},
      histories: {},
      rank: {},
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmMzhlYzU2LTc3NTctNDJkNy04ZjEzLWNjYTFkZjJmNzgwYyIsImZpcnN0bmFtZSI6IlN0ZXZlbiIsImlhdCI6MTU5MjQxODAzOX0.lyTW0f0cJrMoiqc4yUn8xQe9Ap865_KMC_2CK-wDeoU"
    }
  }

  async componentDidMount() {
    this.unsubscribe()
  }


  unsubscribe = () => {
    this.props.navigation.addListener('focus', () => {
      this.fetchUser();
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
      const response = await fetch("https://trocify.herokuapp.com/api/customers/1f38ec56-7757-42d7-8f13-cca1df2f780c", settings);
      const json = await response.json();
      this.setState({ user: json.data.customer, tickets: json.data.customer["tickets"], rank: json.data.customer["rank"] })
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
    const { user, rank, associations, tickets, typeUser } = this.state
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
              <TouchableOpacity
              onPress={() => navigation.navigate('Rank')}
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
          <MyFooter type='classic' navigation={navigation} /> : <MyFooter type='Association' navigation={navigation} />
        }
      </SafeAreaView >
    )
  }
}
