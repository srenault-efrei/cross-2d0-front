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

export default class DetailAssociation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            association: {}
        }
    }

    async componentDidMount() {
        this.unsubscribe()
    }

    unsubscribe = () => {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                association: this.props.route.params.asso
            })
        })
    }

    render() {

        const { navigation } = this.props
        const { association } = this.state
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


                <View style={styles.view}>
                    <Text style={styles.title}>{association.name}</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.description}>
                        {association.description}
                    </Text>
                </View>

                <View style={styles.viewEnd}>
                    <View style={styles.end}>
                        <TouchableOpacity>
                            <Text>PROPOSER UN DON</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation}/>

            </SafeAreaView>
        )
    }
}


