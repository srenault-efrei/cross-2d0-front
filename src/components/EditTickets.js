import React from 'react'
import { View, SafeAreaView, YellowBox, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/add.js'
import { TextInput, Button } from 'react-native-paper'
import _ from 'lodash'
import { Dropdown } from 'react-native-material-dropdown'
import Svg, { Path, Rect } from 'react-native-svg'
import * as ImagePicker from 'expo-image-picker';


YellowBox.ignoreWarnings(['componentWillReceiveProps'])
YellowBox.ignoreWarnings(['componentWillUpdate'])
// const _console = _.clone(console)
// console.warn = message => {
//   if (message.indexOf('componentWillReceiveProps') <= -1) {
//     _console.warn(message)
//   }
// }


export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticket: {},
      categories: {},
      dropdown: [],
      token: "",
      ticket: {},
      title: "",
      category: "",
      description: "",
      localisation: "",
      imagesFiles: [],
      filename3: "",
      filename4: "",
      filename5: "",
      type: "",
      etat: "",
      fixeImageFiles: {}

    }
    this.navigation = this.props.navigation
  }

  async setDataStorage() {
    let data = await AsyncStorage.getItem('data')
    data = JSON.parse(data)

    this.setState({
      token: data.meta.token,
    })
  }

  async componentDidMount() {
    await this.setDataStorage()
    this.fetchCategorie()
    this.setState({
      ticket: this.props.route.params.ticket
    })
    this.fetchTicket()
    this.unsubscribe()
  }

  unsubscribe = () => {
    this.props.navigation.addListener('focus', async () => {
      await this.setDataStorage()
      this.fetchCategorie()
      this.setState({
        ticket: this.props.route.params.ticket
      })
      this.fetchTicket()
    })
  }

  async componentWillUnmount() {
    this.unsubscribe();

  }

  defineCategories = (categories) => {
    let drop = []
    for (const category of categories) {
      let obj = {}
      obj = { 'value': category.title }
      drop.push(obj)
    }

    this.setState({ dropdown: drop })
  }

  fetchCategorie = async () => {
    const settings = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await fetch("https://trocify.herokuapp.com/api/categories", settings);
      const json = await response.json();
      // console.log(json.data.category)
      this.defineCategories(json.data.category)
    } catch (e) {
      console.log(e)
    }
  }

  fetchTicket = async () => {

    const settings = {
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await fetch(`https://trocify.herokuapp.com/api/tickets/${this.state.ticket.id}`, settings);
      const json = await response.json();
      this.setState({
        ticket: json.data.ticket,
        category: json.data.ticket.category.title,
        title: json.data.ticket.title,
        localisation: json.data.ticket.localisation,
        description: json.data.ticket.description,
        imagesFiles: json.data.ticket.imagesFiles,
        type: json.data.ticket.type,
        etat: json.data.ticket.state,
        fixeImageFiles: json.data.ticket.imagesFiles

      })

    } catch (e) {
      console.log(e)
    }
  }
  strUcFirst = (str) => {
    str = str.toLowerCase()
    return (str + '').charAt(0).toUpperCase() + str.substr(1)
  }


  uploadImage = async (index = null) => {

    let tab = this.state.imagesFiles
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    } else {
      if (index <= 2) {
        tab[index] = pickerResult.uri
        this.setState({
          imagesFiles: tab,
        })
      } else {


        if (index === 3) {
          this.setState({
            filename3: pickerResult.uri,
          })
        }
        if (index === 4) {
          this.setState({
            filename4: pickerResult.uri,
          })
        }
        if (index === 5) {
          this.setState({
            filename5: pickerResult.uri,
          })
        }
      }
    }
  }

  isValidForm = () => {
    let boolean = true

    if (this.state.title == '' || this.state.description == '' || this.state.localisation == '') {
      boolean = false
      alert("Tous les champs doivent être remplis.")
    }
    // console.log(boolean)
    return boolean
  }
  uploadTicket = async () => {
  
    if (this.isValidForm()) {
      try {
        const response = await fetch(`https://trocify.herokuapp.com/api/tickets/${this.state.ticket.id}`, {

          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: this.state.title,
            type: this.state.type,
            category: this.defineIdCategory(this.state.category),
            state: this.state.etat,
            description: this.state.description,
            imagesFiles: this.state.fixeImageFiles,
            localisation: this.state.localisation
          }),
          method: 'PUT',

        });
        const json = await response.json();
        // console.log(json)
        if (json.err === undefined) {
          alert("Modification réussie.")
          this.props.navigation.navigate("Profil")
        }
      } catch (e) {
        console.log(e)
      }
    }

  }

  defineIdCategory(str) {
    if (str === "Alimentation") {
      return 1
    } else if (str === "Textile") {
      return 2
    } else if (str === "Jouet") {
      return 3
    } else if (str === "Informatique") {
      return 4
    }
  }

  render() {
    const { navigation } = this.props
    const { ticket, dropdown, category, title, description, localisation, imagesFiles } = this.state
    return (
      <SafeAreaView style={styles.bdy}>
        <MyHeader type='Return' navigation={navigation} />
        <View style={styles.container}>

          <View style={styles.imgContainer}>

            {imagesFiles[0] ?
              <TouchableOpacity onPress={() => this.uploadImage(0)}>
                <Image
                  style={styles.imgTicket}
                  source={{
                    uri:
                      imagesFiles[0],
                  }}
                />
              </TouchableOpacity>
              :
              this.state.filename3 !== '' ?

                <TouchableOpacity onPress={() => this.uploadImage(3)}>
                  <Image
                    style={styles.imgTicket}
                    source={{
                      uri:
                        this.state.filename3,
                    }}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.image} onPress={() => this.uploadImage(3)}>
                  <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24" /><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z" /></Svg>
                </TouchableOpacity>

            }

            {imagesFiles[1] ?
              <TouchableOpacity onPress={() => this.uploadImage(1)}>
                <Image
                  style={styles.imgTicket}
                  source={{
                    uri:
                      imagesFiles[1],
                  }}
                />
              </TouchableOpacity>
              :
              this.state.filename4 !== '' ?

                <TouchableOpacity onPress={() => this.uploadImage(4)}>
                  <Image
                    style={styles.imgTicket}
                    source={{
                      uri:
                        this.state.filename4,
                    }}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.image} onPress={() => this.uploadImage(4)}>
                  <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24" /><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z" /></Svg>
                </TouchableOpacity>

            }


            {imagesFiles[2] ?
              <TouchableOpacity onPress={() => this.uploadImage(2)}>
                <Image
                  style={styles.imgTicket}
                  source={{
                    uri:
                      imagesFiles[2],
                  }}
                />
              </TouchableOpacity>
              :

              this.state.filename5 !== '' ?

                <TouchableOpacity onPress={() => this.uploadImage(5)}>
                  <Image
                    style={styles.imgTicket}
                    source={{
                      uri:
                        this.state.filename5,
                    }}
                  />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.image} onPress={() => this.uploadImage(5)}>
                  <Svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="#fff" width="18px" height="18px"><Rect fill="none" height="24" width="24" /><Path d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z" /></Svg>
                </TouchableOpacity>

            }

          </View>

          <Dropdown
            label='Catégorie'
            value={category}
            data={dropdown}
            onChangeText={(item) => this.setState({ category: item })}
          />

          <TextInput
            mode='outlined'
            label='Titres'
            value={title}
            onChangeText={text => this.setState({ title: text })}
            style={{ marginTop: 20 }}
          />
          <TextInput
            mode='outlined'
            label='Description'
            multiline={true}
            value={description}
            onChangeText={text => this.setState({ description: text })}
            style={{ marginTop: 20, height: 100 }}
          />

          <TextInput
            mode='outlined'
            label='Emplacement'
            value={localisation}
            onChangeText={text => this.setState({ localisation: this.strUcFirst(text) })}
            style={{ marginTop: 20 }}
          />
          <Button mode="contained" style={{ marginTop: 20 }} onPress={() => this.uploadTicket()} color='rgb(63, 81, 181)'>
            ENREGISTRER
                </Button>
        </View>
        <MyFooter type='classic' navigation={this.navigation} />
      </SafeAreaView>
    )
  }
}