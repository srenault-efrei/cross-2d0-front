import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    

} from 'react-native'
import styles from '../../assets/styles/profilCusto'


export default class Associations extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.safeArea}>

                {/* Header */}

                <View style={styles.header}>
                    <Text style={{ color: "white" }}>Header</Text>
                </View>

                <SafeAreaView style={styles.container}>
                    {/* View */}
                    <View style={{ height: "90%"}} >
                        <ScrollView  contentContainerStyle={styles.contentContainer}>
                            <View style={styles.card}>
                                <TouchableOpacity
                                 onPress={() => navigation.navigate('DetailsAssociation')}
                                >
                                    <Text>ASSOCIATION 1</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.card}>
                                <TouchableOpacity
                                 onPress={() => navigation.navigate('DetailsAssociation')}

                                >
                                    <Text>ASSOCIATION 2</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.card}>
                                <TouchableOpacity
                                onPress={() => navigation.navigate('DetailsAssociation')}
                                >
                                    <Text>ASSOCIATION 3</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.card}>
                                <TouchableOpacity
                                onPress={() => navigation.navigate('DetailsAssociation')}
                                >
                                    <Text>ASSOCIATION 4</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>

                {/* Footer  */}

                <View style={styles.footer}>
                    <Text style={{ color: "white" }}>Footer</Text>
                </View>

            </View>
        )
    }
}


