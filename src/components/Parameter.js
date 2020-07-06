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
import {Avatar } from 'react-native-elements'




export default class Paremeter extends Component {

    logout = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            await AsyncStorage.multiRemove(keys)
        }
        catch (err) {
            console.log('deconnexion erreur :', err);

        }
        this.props.navigation.navigate('SignIn')
    }

    render() {
        const { navigation } = this.props

        return (
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
                <MyHeader type='back' navigation={navigation} />

                <View style={{ alignItems: "center", top: 40, position: 'absolute', zIndex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                    <Avatar
                        rounded
                        size={100}
                        onPress={(() => this.props.navigation.navigate("Profil"))}
                        source={{
                            uri:
                                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                        }}
                    />
                </View>

                <View style={styles.view}>
                    <View style={styles.card}>

                        <TouchableOpacity>
                            <Text>SOUTENEZ-NOUS</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <TouchableOpacity>
                            <Text>CONDITIONS D'UTILISATIONS</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <TouchableOpacity>
                            <Text>NOUS CONTACTER</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewEnd}>
                    <View style={styles.endRow}>
                        <TouchableOpacity
                            onPress={() => this.logout()}
                        >
                            <Text>DECONNEXION</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.endRow}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SignIn")}
                        >
                            <Text>SUPPRIMER MON COMPTE</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation} />

            </SafeAreaView>
        )
    }
}


