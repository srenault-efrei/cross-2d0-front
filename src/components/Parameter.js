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




export default class Paremeter extends Component {

     logout = async () =>  {
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
                <MyHeader type='Return' navigation={navigation} />
                <View style={global.circle}>
                    <TouchableOpacity
                        onPress={() =>  navigation.navigate("Profil")} >
                        <Text>IMG</Text>
                        <Text>Profile</Text>
                    </TouchableOpacity>
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
                        onPress={() =>  this.logout()}
                        >
                            <Text>DECONNEXION</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.endRow}>
                        <TouchableOpacity
                        onPress={() =>  navigation.navigate("SignIn")}
                        >
                            <Text>SUPPRIMER MON COMPTE</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Footer  */}
                <MyFooter type='classic'navigation={navigation} />

            </SafeAreaView>
        )
    }
}


