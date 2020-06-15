import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import styles from '../../assets/styles/styles';

export const UserType = {
    PROVIDER: "provider",
    CUSTOMER: "customer"
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
        const req = await fetch('', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: this.state.email.trim(), password: this.state.password.trim() })
        })
        const json = await req.json()
        if (json.err) {
            this.setState({ error: json.err.description })
        } else {

        }
    }

    render() {
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
                        <Text onPress={() => this.goTo('ForgotPassword')}>Mot de passe oublié</Text>
                    </View>
                    <View style={styles.lowLoginView}>
                        <View style={styles.splitter} />
                        <View style={styles.textInput}>
                            <Text>Connexion Google</Text>
                            <Text>Connexion Facebook</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text onPress={() => this.props.navigation.navigate('Inscription')}>Pas encore inscrit ? Clique ici !</Text>
                </View>
            </SafeAreaView>
        );
    }

}