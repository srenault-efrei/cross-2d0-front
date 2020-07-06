import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import styles from '../../assets/styles/styles';
import email from 'react-native-email';

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

    handleEmail() {
        email(this.state.email.trim() || 'maxime_trocify@yopmail.com', {
            // Optional additional arguments
            cc: ['contact@trocify.com'], // string or array of email addresses
            bcc: 'contact_trocify@yopmail.com', // string or array of email addresses
            subject: 'Mot de passe oublié',
            body: 'Some body right here'
        }).catch(console.error)
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.titleView}>
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
                        <Text style={styles.textButton} onPress={() => this.handleEmail()}>Envoyer</Text>
                    </View>
                </View>
                <Text style={styles.error}>{this.state.error}</Text>
                
                <View style={styles.bottomView}>
                    <Text onPress={() => this.props.navigation.navigate('SignIn')}>Retour</Text>
                </View>
            </SafeAreaView>
        );
    }

}