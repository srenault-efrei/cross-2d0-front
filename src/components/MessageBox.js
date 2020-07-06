import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    TextInput,
    AsyncStorage
} from 'react-native'
import { Icon } from 'react-native-elements'
import styles from '../../assets/styles/messages'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'



export default class MessageBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            user: null,
            type: null,
            messages: null,
            content: ''
        }
    }

    async componentDidMount() {
        await this.fetchUser();
        if (this.props.route && this.props.route.params && this.props.route.params.interlocutor) {
            this.fetchConv(this.props.route.params.interlocutor)
        }
    }

    componentDidUpdate() {
        if (this.props.navigation.isFocused() && this.props.route && this.props.route.params && this.props.route.params.interlocutor) {
            this.fetchConv(this.props.route.params.interlocutor)
        }
    }
    


    async fetchUser() {
        let data = await AsyncStorage.getItem('data')
        if (data != undefined) {
            data = JSON.parse(data)
            this.setState({ token: data.meta.token })
            if (data.customer) {
                this.setState({ user: data.customer, type: 'customer' })
            }
            else {
                this.setState({ user: data.association, type: 'association' })
            }
        }

    }

    fetchConv = async (idInterlocutor) => {

        if (this.state.user != null) {
            const settings = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.state.token,
                    'Content-Type': 'application/json',
                }
            };

            try {
                let url = `https://trocify.herokuapp.com/api/users/${this.state.user.id}/messages/${idInterlocutor}`
                const response = await fetch(url, settings);
                const json = await response.json();


                if (json) {
                    this.setState({ messages: json.data.message })
                }


            } catch (e) {
                console.log(e)
            }

        }


    }



    onChangeText(content) {
        this.setState({ content })
    }
    async sendMessage() {
        if (this.state.content.trim() != '') {
            const content = this.state.content
            const recipient = this.props.route.params.interlocutor
            const jsonBody = { recipient, content }
            const url = `https://trocify.herokuapp.com/api/users/${this.state.user.id}/messages/`
            try {
                const response = await fetch(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.state.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonBody),
                    method: 'POST'
                });
                const json = await response.json();
                this.setState({ content: '' })
            } catch (e) {
                console.log(e)
            }
            this.setState({ content: '' })
            this.textInput.clear()

        }


    }

    getContentBox(item) {
        if (item.sender.id == this.state.user.id) {
            return (
                <View  style={{ flex: 1, flexDirection: 'row',alignItems:"center",alignSelf: "flex-end"}}>
                
                    <View style={{ width: '70%', padding: 10,  borderWidth: 1, borderRadius: 15, marginBottom: 10, marginHorizontal: 5 }} >

                        <View style={{ flex: 1, color: 'gray' }}>
                            <Text style={{ fontSize: 15, color: 'gray' }} >{item.content} </Text >
                        </View>
                    </View>
                    <Image
                        style={styles.cardLogo}
                        source={require('../../assets/img/yen.png')}
                    />
                </View>

            )
        }
        return (
            <View  style={{ flex: 1, flexDirection: 'row',alignItems:"center"}}>
                      <Image
                style={styles.cardLogo}
                source={require('../../assets/img/yen.png')}
            />
            <View style={{ width: '70%', padding: 10,  borderWidth: 1,backgroundColor:'lightgray', borderRadius: 15, marginBottom: 10, marginHorizontal: 5 }} >

                <View style={{ flex: 1, color: 'gray' }}>
                    <Text style={{ fontSize: 15, color: 'gray' }} >{item.content} </Text >
                </View>
            </View>
      
        </View>
        )


    }


    render() {

        const { navigation } = this.props
        const {messages} = this.state;
        return (
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
                <MyHeader type='classic' navigation={navigation} />

                {messages != null &&
                    <SafeAreaView style={styles.contentContainer}>
                        <FlatList
                            data={messages}
                            renderItem={({ item }) =>
                                this.getContentBox(item)

                            }
                            keyExtractor={item => String(item.id)}
                        />
                    </SafeAreaView>
                }

                <View style={{ position: 'relative', bottom: 4, height: 40, flexDirection: 'row',alignItems: 'center'  }}>
                    <View style={{ width: '85%', height: 40 }} >
                        <TextInput
                            style={{ height: '100%', borderColor: 'gray', borderWidth: 1 }}
                            onChangeText={text => this.onChangeText(text)}
                            placeholder='Saisissez votre message ici'
                            ref={input => { this.textInput = input }}
                        />
                    </View>
                    <TouchableOpacity onPress={(T) => this.sendMessage()} style={{ width: '15%', }}>
                    <Icon
                            name="send"
                            size={20}
                            type='material'
                            color="green"
                            
                        />
                    </TouchableOpacity>
                </View>
                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation} />

            </SafeAreaView>
        )
    }
}
