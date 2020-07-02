import React from 'react'
import { View, SafeAreaView } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/map.js'
import MapView from 'react-native-maps'



export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.navigation = this.props.navigation
        
    }
    
    static navigationOptions = {
        header: {
            visible: false
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.bdy}>
                <MyHeader type='back' navigation={this.navigation}/>
                <View style={styles.container}>
                    <MapView style={styles.mapStyle} />
                </View>
                <MyFooter type='classic' navigation={this.navigation}/>
            </SafeAreaView>
        )
    }
}