import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    AsyncStorage
} from 'react-native'
import styles from '../../assets/styles/profilCusto'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import global from '../../assets/css/global.js'

export default class DetailAssociation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            association: {},
            token: '',
            user: {}
        }
    }

    async componentDidMount() {
        await this.setDataStorage()
        this.setState({
            association: this.props.route.params.asso
        })
        this.unsubscribe()
    }

    unsubscribe = () => {
        this.props.navigation.addListener('focus', async () => {
            await this.setDataStorage()
            this.setState({
                association: this.props.route.params.asso
            })
        })
    }


    async setDataStorage() {
        let data = await AsyncStorage.getItem('data')
        data = JSON.parse(data)

        this.setState({
            token: data.meta.token,
        })
        this.setState({ user: data.customer })
    }

    sendProposition = async () => {
        console.log(this.state.token)
        console.log(this.state.user.id)
        try {
            const response = await fetch(`https://trocify.herokuapp.com/api/users/${this.state.user.id}/messages`, {

                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.state.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: this.writeMessage(this.state.user),
                    recipient: this.state.association.id,
                }),
                method: 'POST',

            });
            const json = await response.json();
            console.log(json)
            if (json.err === undefined) {
                this.props.navigation.navigate("Profil")
            }
        } catch (e) {
            console.log(e)
        }
    }

    writeMessage(user) {
        if (user.gender === 'homme') {
            return `Mr ${user.firstname} ${user.lastname} vous propose un don`
        } else {
            return `Mme ${user.firstname} ${user.lastname} vous propose un don`
        }
    }


    render() {

        const { navigation } = this.props
        const { association } = this.state
        return (
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
                <MyHeader type='Return' navigation={navigation} />
                <View style={global.circle}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Profil")} >
                        <Text>IMG</Text>
                        <Text>Profile</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.view}>
                    <Text style={styles.title}>{association.name}</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.description}>
                        {association.description}
                    </Text>
                </View>

                <View style={styles.viewEnd}>
                    <View style={styles.end}>
                        <TouchableOpacity
                        onPress={() => this.sendProposition()}
                        >
                            <Text>PROPOSER UN DON</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation} />

            </SafeAreaView>
        )
    }
}


