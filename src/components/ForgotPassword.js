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

export default class ForgotPassword extends Component {

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
                    <Text style={styles.title}>{"MOT DE PASSE\nOUBLIÉ"}</Text>
                </View>
                <View style={styles.loginView}>
                    <TextInput
                        name="email"
                        autoCapitalize='none'
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                    />
                    <View style={styles.button}>
                        <Text style={styles.textButton} onPress={() => this.signIn()}>Envoyé</Text>
                    </View>
                </View>
                <Text style={styles.error}>{this.state.error}</Text>
                
                <View style={styles.bottomView}>
                    <Text onPress={() => this.props.navigation.navigate('Inscription')}>Retour</Text>
                </View>
            </SafeAreaView>
        );
    }

}