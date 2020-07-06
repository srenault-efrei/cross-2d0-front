import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../assets/styles/styles'


export default class SignUpAssociation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            longitude: 0,
            latitude: 0,
            filename: '',
            error: ''
        };
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ longitude: position.coords.longitude, latitude: position.coords.latitude });
                console.log(`Geolocation data - longitude : ${position.coords.longitude}, latitude : ${position.coords.latitude}`);
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    async uploadImage() {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (!pickerResult.cancelled) {
            this.setState({
                filename: pickerResult.uri
            });
        } else return;
    }

    async signUp() {
        if (this.isSamePasswords(this.state.password, this.state.passwordConfirmation)) {

            const req = await fetch('https://trocify.herokuapp.com/api/authenticate/signup/associations', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.name.trim(),
                    email: this.state.email.trim(),
                    password: this.state.password.trim(),
                    passwordConfirmation: this.state.passwordConfirmation.trim(),
                    longitude: this.state.longitude,
                    latitude: this.state.latitude
                })
            })
            try {
                const json = await req.json();
                if (json.err) {
                    this.setState({ error: json.err.description });
                } else {
                    console.log(json.data);
                    await this._storeData(json.data);
                    this.props.navigation.navigate('Confidentiality');
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            this.setState({ error: 'Attention,\nLes mots de passe saisis ne correspondent pas' });
        }
    }

    isSamePasswords(password, passwordConfirmation) {
        return (password.trim() === passwordConfirmation.trim()) ? true : false;
    }

    _storeData = async (data) => {
        try {
            await AsyncStorage.setItem('data', JSON.stringify(data));
        } catch (error) {
            console.log('Local storage data Error : ', error);
        }
    }

    render() {
        const { navigation } = this.props;
        console.disableYellowBox = true;

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.titleView}>
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
                        <View style={styles.imageButton}>
                            <Icon
                                name="camera"
                                size={20}
                                style={[styles.icon, { color: 'black', paddingHorizontal: 5 }]}
                            />
                            <Text style={styles.textImageButton} numberOfLines={1} onPress={() => this.uploadImage()}>{
                                this.state.filename ? this.state.filename : 'Importer une image...'
                            }</Text>
                        </View>
                        <View style={styles.button}>
                            <Text style={styles.textButton} onPress={() => this.signUp()}>S'inscrire</Text>
                        </View>
                    </View>
                    <Text style={styles.error}>{this.state.error}</Text>
                </View>
                <View style={styles.bottomView}>
                    <Text onPress={() => navigation.navigate('SignIn')}>Déjà inscrit ? Clique ici !</Text>
                </View>
            </SafeAreaView>
        );
    }

}