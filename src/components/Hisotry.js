import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    

} from 'react-native'
import styles from '../../assets/styles/profilCusto'


export default class History extends Component {
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
                        <ScrollView  contentContainerStyle={styles.content}>
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

                <View style={styles.footer}>
                    <Text style={{ color: "white" }}>Footer</Text>
                </View>

            </View>
        )
    }
}


