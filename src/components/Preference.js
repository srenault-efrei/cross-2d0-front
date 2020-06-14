import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    AsyncStorage,
    Image
} from 'react-native';
import styles from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const UserType = {
    INDIVIDUAL: "individual",
    ASSOCIATION: "association"
}

export default class SignUp extends Component {

    constructor(props) {
        super(props)

        this.state = {
            token: '',
            user: {},
            error: ''
        }
    }

    async componentDidMount() { }

    async setType(type) {
        const req = await fetch(`https://eazybiff-server.herokuapp.com/api/users/${this.state.user.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            },
            body: JSON.stringify({
                firstname: this.state.user.firstname,
                lastname: this.state.user.lastname,
                birthday: this.state.user.birthday,
                bio: 'Pas de biographie',
                type,
                phone: this.state.user.phone

            })
        })
        try {
            const responseJson = await req.json();

            if (responseJson.err) {
                this.setState({ error: responseJson.err.description })
                console.log(responseJson.err.description)
            }
            else {
                console.log(responseJson);
                await this._storeData(responseJson.data.user);
                if (type === UserType.CUSTOMER) {
                    this.props.navigation.navigate('ServicesCusto');
                }
                else if (type === UserType.PROVIDER) {
                    this.props.navigation.navigate('Services');
                }
            }
        } catch (error) {
            console.log(error)
            this.setState({ error })
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loginView}>
                    <View style={styles.button}>
                        <Icon
                            name="account"
                            size={20}
                            style={styles.icon}
                        />
                        <Text style={[styles.textButton, { marginLeft: -45 }]} onPress={() => this.setType(UserType.INDIVIDUAL)}>Je suis une personne</Text>
                    </View>
                    <View style={styles.button}>
                        <Icon
                            name="account-group"
                            size={20}
                            style={styles.icon}
                        />
                        <Text style={[styles.textButton, { marginLeft: -45 }]} onPress={() => this.setType(UserType.ASSOCIATION)}>Je suis une association</Text>
                    </View>
                </View>
            </SafeAreaView >
        );
    }

}
