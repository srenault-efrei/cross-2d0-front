import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import styles from '../../assets/styles/styles'


export default class SignUpAssociation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            file: '',
            error: ''
        };
    }

    componentDidMount() {
        this.isThereError();
    }

    isThereError() {
        if (this.props.error) {
            console.log(`${this.props.error.screen} sreen return error : ${this.props.error.text}`);
        }
        if (this.props.route) {
            console.log(this.props.route)
        }
    }

    async signUp() {
        if (this.isSamePasswords(this.state.password, this.state.passwordConfirmation)) {

            const req = await fetch('https://eazybiff-server.herokuapp.com/api/authenticate/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: this.state.firstname.trim(),
                    lastname: this.state.lastname.trim(),
                    birthday: this.state.birthday,
                    email: this.state.email.trim(),
                    password: this.state.password.trim(),
                    passwordConfirmation: this.state.passwordConfirmation.trim(),
                    phone: this.state.phone.trim()
                })
            })
            try {
                const responseJson = await req.json()

                if (responseJson.err) {
                    this.setState({ error: responseJson.err.description })
                } else {
                    console.log(responseJson);
                    await this._storeData(responseJson.data.meta.token, responseJson.data.user);
                    this.props.navigation.navigate('Preference');
                }
            }
            catch (error) {
                console.error(error);
            };
        } else {
            this.setState({ error: 'Attention,\nLes mots de passe saisis ne correspondent pas' });
        }
    }

    isSamePasswords(password, passwordConfirmation) {
        return (password.trim() === passwordConfirmation.trim()) ? true : false;
    }

    render() {
        console.disableYellowBox = true;
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topView}>
                    <Text style={styles.title}>TROCIFY</Text>
                </View>
                <View style={styles.loginView}>
                    <View style={styles.inputView}>
                        <TextInput
                            autoCapitalize='none'
                            style={styles.input}
                            placeholder="Nom de l'association"
                            onChangeText={name => this.setState({ name })}
                        />
                        <TextInput
                            caretHidden
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
                        <TextInput
                            secureTextEntry={true}
                            style={styles.input}
                            placeholder="Confirmation du mot de passe"
                            onChangeText={passwordConfirmation => this.setState({ passwordConfirmation })}
                        />
                        <View style={styles.button}>
                            <Text style={styles.textButton} onPress={() => this.signUp()}>S'inscrire</Text>
                        </View>
                    </View>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
                <View style={styles.bottomView}>
                    <Text onPress={() => this.props.navigation.navigate('Connexion')}>Déjà inscrit ? Clique ici !</Text>
                </View>
            </SafeAreaView>
        );
    }

}
