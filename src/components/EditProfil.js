import React from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import { Text, CheckBox } from 'react-native-elements'
import styles from '../../assets/css/search.js'
import global from '../../assets/css/global.js'
import { TextInput, Button } from 'react-native-paper';


export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      user: {},
      typeUser: "customer",
      firstname:'',
      lastname:'',
      gender:'',
      email:'',
      name:'',
      description:'',
      password: '',
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmMzhlYzU2LTc3NTctNDJkNy04ZjEzLWNjYTFkZjJmNzgwYyIsImZpcnN0bmFtZSI6IlN0ZXZlbiIsImlhdCI6MTU5MjQxODAzOX0.lyTW0f0cJrMoiqc4yUn8xQe9Ap865_KMC_2CK-wDeoU"
  
    }
    this.navigation = this.props.navigation
  }

  componentDidMount() {
    this.fetchUser();
    // this.fetchUserAsso();

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
      this.setState({  user: customer, firstname: customer.firstname, lastname: customer.lastname, gender: customer.gender, email: customer.email})
      if(json.data.customer.gender === 'homme'){
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
      this.setState({  user: association, name: association.name, email: association.email, description: association.description})
      if(json.data.customer.gender === 'homme'){
        this.setState({ checked: true })
      }
        console.log(this.state.user)
    } catch (e) {
      console.log(e)
    }
  }



  render() {
    const { navigation } = this.props
    const { typeUser, checked } = this.state
    console.log(this.state.user)

    return (
      <SafeAreaView style={styles.bdy}>
        <MyHeader type='Profile' />
        <View style={global.circle}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profil")} >
            <Text>IMG</Text>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>

          {typeUser === 'customer' ? <View>
            <TextInput
              mode='outlined'
              label='FIRST NAME'
              value={this.state.firstname.toLocaleUpperCase()}
              onChangeText={text => this.setState({ firstname: text })}
            />
            <TextInput
              mode='outlined'
              label='LAST NAME'
              value={this.state.lastname.toLocaleUpperCase()}
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
              onPress={() => this.setState({ checked: true })}
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
              onPress={() => this.setState({ checked: !this.state.checked })}
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
            value={'password'}
            onChangeText={text => this.setState({ password: text })}
            style={{ marginTop: 10 }}
          />

          <Button style={{ marginTop: 25 }} icon="camera" mode="contained" onPress={() => console.log('Pressed')} color='rgb(63, 81, 181)'>
            ENREGISTRER
        </Button>
        </View>

        {typeUser === 'customer' ?
          <MyFooter type='classic' navigation={navigation} /> : <View></View>}
        {typeUser === 'association' ?
          <MyFooter type='Association' navigation={navigation} /> : <View></View>}

      </SafeAreaView>
    )
  }
}