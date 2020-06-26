import React from 'react'
import { View, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import { CheckBox, Avatar } from 'react-native-elements'
import styles from '../../assets/css/search.js'
import global from '../../assets/css/global.js'
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';



export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      user: {},
      typeUser: "customer",
      firstname: '',
      lastname: '',
      gender: '',
      email: '',
      name: '',
      avatarFile: null,
      filename:'',
      key:'',
      description: '',
      password: 'xxxxxxxxxx',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmMzhlYzU2LTc3NTctNDJkNy04ZjEzLWNjYTFkZjJmNzgwYyIsImZpcnN0bmFtZSI6IlN0ZXZlbiIsImlhdCI6MTU5MjQxODAzOX0.lyTW0f0cJrMoiqc4yUn8xQe9Ap865_KMC_2CK-wDeoU"

    }
    this.navigation = this.props.navigation
  }

  componentDidMount() {
    this.fetchUser();
    // this.fetchUserAsso();

  }

  isValidForm = (type) => {
    let regex = /^.+@.+['.']com|^.+@.+['.']fr|^.+@.+['.']net/g
    let isValid = true
    if (type === 'association') {
      if (this.state.name === '' || this.state.description === '' || this.state.email === '' || this.state.password === '') {
        isValid = false
        alert('Tous les champs doivent être remplis.')
      } else if (!this.state.email.match(regex)) {
        isValid = false
        alert("L'email n'est pas valide.")
      }
    } else {
      if (this.state.lastname === '' || this.state.firstname === '' || this.state.email === '' || this.state.password === '') {
        isValid = false
        alert('Tous les champs doivent être remplis.')
      } else if (!this.state.email.match(regex)) {
        isValid = false
        alert("L'email n'est pas valide.")
      }
    }
    return isValid
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
      const customer = json.data.customer
      this.setState({
        user: customer,
        firstname: customer.firstname,
        lastname: customer.lastname,
        gender: customer.gender,
        email: customer.email,
      })
      if (customer.avatarFile !== null) {
        this.setState({ avatarFile: customer.avatarFile })
      }
      if (json.data.customer.gender === 'homme') {
        this.setState({ checked: true })
      }
      // console.log(this.state.user)
    } catch (e) {
      console.log(e)
    }
  }


  fetchUserAsso = async () => {

    const settings = {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await fetch("https://trocify.herokuapp.com/api/associations/5f38ec56-7757-42d7-8f13-cca1df2f780c", settings);
      const json = await response.json();
      const association = json.data.association
      this.setState({
        user: association,
        name: association.name,
        email: association.email,
        description: association.description,
        avatarFile: association.avatarFile
      })
      if (association.avatarFile !== null) {
        this.setState({
          avatarFile: association.avatarFile
        })
      }
      // console.log(this.state.user)
    } catch (e) {
      console.log(e)
    }
  }


  uploadAssociation = async () => {

    if (this.isValidForm(this.state.typeUser)) {
      let jsonBody = {}

      if (this.state.password === 'xxxxxxxxxx') {
        jsonBody = {
          name: this.strUcFirst(this.state.name),
          filePath: this.state.user.filePath,
          email: this.state.email,
          description: this.state.description,
          geolocalisation: true,
          // filename: this.state.filename,
          // key: `profil_${this.state.user.id}.png`
        }
      } else {
        jsonBody = {
          name: this.strUcFirst(this.state.name),
          filePath: this.state.user.filePath,
          email: this.state.email,
          description: this.state.description,
          geolocalisation: true,
          password: this.state.password,
          // filename: this.state.filename,
          // key: `profil_${this.state.user.id}.png`

        }
      }
      try {
        const response = await fetch("https://trocify.herokuapp.com/api/associations/5f38ec56-7757-42d7-8f13-cca1df2f780c", {

          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBody),
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


  uploadCustomer = async () => {

    if (this.isValidForm(this.state.typeUser)) {
      let jsonBody = {}

      if (this.state.password === 'xxxxxxxxxx') {
        jsonBody = {
          firstname: this.strUcFirst(this.state.firstname),
          lastname: this.strUcFirst(this.state.lastname),
          email: this.state.email,
          gender: this.state.gender,
          geolocalisation: true,
          rank: this.state.user.rank.id,
          // filename: this.state.filename,
          // key: `profil_${this.state.user.id}.png`

        }
      } else {
        jsonBody = {
          firstname: this.strUcFirst(this.state.firstname),
          lastname: this.strUcFirst(this.state.lastname),
          email: this.state.email,
          gender: this.state.gender,
          geolocalisation: true,
          rank: this.state.user.rank.id,
          password: this.state.password,
          // filename: this.state.filename,
          // key: `profil_${this.state.user.id}.png`

        }
      }
      try {
        const response = await fetch("https://trocify.herokuapp.com/api/customers/1f38ec56-7757-42d7-8f13-cca1df2f780c", {

          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + this.state.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonBody),
          method: 'PUT',

        });
        const json = await response.json();
        console.log(json)
        if (json.err === undefined) {
          alert("Modification réussie.")
          this.props.navigation.navigate("Profil")
        }
      } catch (e) {
        console.log(e)
      }
    }

  }

  changeGender = (bool) => {
    this.setState({ checked: !bool })
    if (bool) {
      this.setState({ gender: "femme" })
    } else {
      this.setState({ gender: "homme" })
    }
  }

  strUcFirst = (str) => {
    str = str.toLowerCase()
    return (str + '').charAt(0).toUpperCase() + str.substr(1)
  }

  uploadAvatar = async () => {


    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // console.log(pickerResult);


    if (pickerResult.cancelled === true) {
      return;
    } else {
      this.setState({ 
        filename: pickerResult.uri,
        avatarFile: pickerResult.uri 
      })
    }



  }

  render() {
    const { navigation } = this.props
    const { typeUser, checked, filename } = this.state
    let avatar = this.state.avatarFile === null ? "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" : this.state.avatarFile
    console.log(avatar)

    return (
      <SafeAreaView style={styles.bdy}>
        <MyHeader type='Profile' />
        <View style={{alignItems:"center", top:30, position: 'absolute', zIndex: 1, alignSelf: 'center', justifyContent:'center', alignItems: 'center'}}>
          <Avatar
            rounded
            size={100}
            onPress={() => this.uploadAvatar()}
            source={{
              uri:
              avatar,
            }}
            showAccessory
          />
        </View>

        <View style={styles.container}>

          {typeUser === 'customer' ? <View>
            <TextInput
              mode='outlined'
              label='FIRST NAME'
              value={this.state.firstname.toUpperCase()}
              onChangeText={text => this.setState({ firstname: text })}
            />
            <TextInput
              mode='outlined'
              label='LAST NAME'
              value={this.state.lastname.toUpperCase()}
              onChangeText={text => this.setState({ lastname: text })}
              style={{ marginTop: 10 }}
            />
          </View>
            : <View>
              <TextInput
                mode='outlined'
                label='NAME'
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
              />

            </View>
          }

          {typeUser === 'customer' ? <View style={{ flexDirection: "row", justifyContent: 'center' }}>
            <CheckBox
              center
              title='Homme'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={this.state.checked}
              onPress={() => this.changeGender(checked)}
              containerStyle={{
                backgroundColor: '#F2F2F2',
              }}
            />
            <CheckBox
              center
              title='Femme'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={!this.state.checked}
              onPress={() => this.changeGender(checked)}
              containerStyle={{
                backgroundColor: '#F2F2F2',
              }}
            />
          </View> : <TextInput
              mode='outlined'
              label='DESCRIPTION'
              multiline={true}
              value={this.state.description}
              onChangeText={text => this.setState({ description: text })}
              style={{ marginTop: 10, height: 100 }}
            />}

          <TextInput
            mode='outlined'
            label='EMAIL'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            style={{ marginTop: 10 }}
          />

          <TextInput
            mode='outlined'
            secureTextEntry={true}
            label='PASSWORD'
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            style={{ marginTop: 10 }}
          />
          {typeUser === 'association' ?
            <Button style={{ marginTop: 25 }} icon="camera" mode="contained" onPress={() => this.uploadAssociation()} color='rgb(63, 81, 181)'>
              ENREGISTRER
        </Button> : <Button style={{ marginTop: 25 }} icon="camera" mode="contained" onPress={() => this.uploadCustomer()} color='rgb(63, 81, 181)'>
              ENREGISTRER
        </Button>
          }


        </View>

        {typeUser === 'customer' ?
          <MyFooter type='classic' navigation={navigation} /> : <MyFooter type='Association' navigation={navigation} />
        }

      </SafeAreaView>
    )
  }
}