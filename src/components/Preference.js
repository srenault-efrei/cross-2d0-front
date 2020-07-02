import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image
} from 'react-native';
import styles from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SignUp extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loginView}>
                    <View style={styles.button}>
                        <Icon
                            name="account"
                            size={20}
                            style={styles.icon}
                        />
                        <Text style={[styles.textButton, { marginLeft: -45 }]} onPress={() => navigation.navigate('SignUpIndividual')}>Je suis une personne</Text>
                    </View>
                    <View style={styles.button}>
                        <Icon
                            name="account-group"
                            size={20}
                            style={styles.icon}
                        />
                        <Text style={[styles.textButton, { marginLeft: -45 }]} onPress={() => navigation.navigate('SignUpAssociation')}>Je suis une association</Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <Text onPress={() => navigation.navigate('SignIn')}>Retour</Text>
                </View>
            </SafeAreaView >
        );
    }

}
