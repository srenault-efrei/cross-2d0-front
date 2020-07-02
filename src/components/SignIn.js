import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    AsyncStorage
} from 'react-native';
import styles from '../../assets/styles/styles';

export const UserType = {
    CUSTOMER: "customer",
    ASSOCIATION: "association"
}

export default class Signin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    async signIn() {
        const req = await fetch('https://trocify.herokuapp.com/api/authenticate/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.email.trim(), password: this.state.password.trim() })
        })
        try {
            const json = await req.json();
            if (json.err) {
                this.setState({ error: json.err.description });
            } else {
                console.log(json.data);
                await this._storeData(json.data);
                if (json.data.customer || json.data.association) {
                    this.props.navigation.navigate('Home');
                    console.log("Log succesfully : ", json.data.customer ? UserType.CUSTOMER : UserType.ASSOCIATION);
                } else {
                    console.log('Error: no user type');
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('data', JSON.stringify(data));
        } catch (error) {
            console.log('Local storage data Error : ', error);
        }
    }

    render() {
        const { navigation } = this.props

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topView}>
                    <Text style={styles.title}>TROCIFY</Text>
                </View>
                <View style={styles.loginView}>
                    <View style={styles.inputView}>
                        <TextInput
                            name="email"
                            autoCapitalize='none'
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Mot de passe"
                            onChangeText={password => this.setState({ password })}
                        />
                        <View style={styles.button}>
                            <Text style={styles.textButton} onPress={() => this.signIn()}>Connexion</Text>
                        </View>
                    </View>
                    <Text style={styles.error}>{this.state.error}</Text>
                    <View style={styles.textInput}>
                        <Text onPress={() => navigation.navigate('ForgotPassword')}>Mot de passe oublié</Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text onPress={() => navigation.navigate('Preference')}>Pas encore inscrit ? Clique ici !</Text>
                </View>
            </SafeAreaView>
        );
    }

}
