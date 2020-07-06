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
import { Avatar } from 'react-native-elements'


export default class Associations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            associations: this.props.route.params.associations
        }
    }

    async componentDidMount() {
        this.unsubscribe()
    }

    unsubscribe = () => {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                associations: this.props.route.params.associations
            })
        })
    }

    async componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        const { navigation } = this.props
        const { associations } = this.state
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

                <SafeAreaView style={styles.container}>
                    {/* View */}
                    <View style={{ height: "90%" }} >
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            {associations["association"].map((asso, idAsso) => (

                                <View key={idAsso} style={styles.card}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('DetailsAssociation', { asso })}
                                    >
                                        <Text>{asso.name}</Text>
                                    </TouchableOpacity>
                                </View>

                            ))}

                        </ScrollView>
                    </View>
                </SafeAreaView>

                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation} />

            </SafeAreaView>
        )
    }
}


