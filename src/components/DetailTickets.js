import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView


} from 'react-native'
import styles from '../../assets/styles/profilCusto'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import global from '../../assets/css/global.js'

export default class DetailTickets extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.navigation = this.props.navigation
      }
    render() {

        const { navigation } = this.props
        return (
            <SafeAreaView style={styles.safeArea}>

                {/* Header */}
                <MyHeader data={this.props.route.params.product} type='Return-Pencil' navigation={this.props.navigation} />

                <View style={styles.view}>
                        <Text>Details</Text>
                </View>

                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation}/>

            </SafeAreaView>
        )
    }
}


