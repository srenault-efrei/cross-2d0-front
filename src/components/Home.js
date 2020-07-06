import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, YellowBox, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/home.js'
import { Card, Avatar } from 'react-native-elements'
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
    await this.setDataStorage()
    this.fetchTrocs()
    this.unsubscribe()

  }

  unsubscribe = () => {
    this.props.navigation.addListener('focus',async () => {
      await this.setDataStorage()
      this.fetchTrocs()
    })
  }

  async componentWillUnmount() {
    this.unsubscribe();
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
    let user = await AsyncStorage.getItem('data')
    if (!user) {
      this.props.navigation.navigate("SignIn")
    } 
    else {
      let data = JSON.parse(user)
      this.setState({ user: data, token: data.meta.token, })
      data.customer ? this.setState({ typeUser: "customer",id: data.customer.id }) : this.setState({ typeUser: "association", id: data.association.id })
      // console.log(this.state.user)
    }
  }

  redirect(page, data) {
    if (data != '') {
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
      if (itemTitle.indexOf(data.keyword.toLowerCase()) || itemCategory === data.category.id || itemType === data.type.toLowerCase() || itemLocation === data.location.toLowerCase()) {
        return item
      }
    })

    this.setState({
      data: newData
    })
  }

  fetchTrocs = async () => {
    const {token} = this.state
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
      })
  }

  footerType = () => {
    if (this.state.typeUser === 'customer') {
      return <MyFooter type ='classic' navigation={this.navigation}/>
    } else {
      return <MyFooter type ='association' navigation={this.navigation}/>
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.bdy}>
        <MyHeader type='classic' navigation={this.navigation} search={this.searchHandler} />
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
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.bdy}
        >
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.redirect('ProductDetails', {product: item, isEdit:false})}>
                    <Card>
                        <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: 100,maxHeight:110}}>
                            <Image
                              style={{width: 100, height: 100, borderRadius: 50}}
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
        </KeyboardAvoidingView>
        {this.footerType()}
      </SafeAreaView>
    )
  }
}