import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,


} from 'react-native'
import styles from '../../assets/styles/profilCusto'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import global from '../../assets/css/global.js'

export default class History extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props
        return (
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
                <MyHeader type='Return' navigation={navigation} />
                <View style={global.circle}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Profil")} >
                        <Text>IMG</Text>
                        <Text>Profile</Text>
                    </TouchableOpacity>
                </View>


                <SafeAreaView style={styles.container}>
                    {/* View */}
                    <View style={{ height: "90%" }} >
                        <ScrollView contentContainerStyle={styles.content}>
                            <View style={styles.historyCard}>
                                <View style={styles.cercle}>
                                    <Text>Image produit</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text>TABLE EN BOIS</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </View>

                </SafeAreaView>

                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation} />

            </SafeAreaView>
        )
    }
}


