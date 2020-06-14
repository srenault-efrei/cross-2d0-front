import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,

} from 'react-native'
import styles from '../../assets/styles/profilCusto'


export default class Paremeter extends Component {


    render() {
        return (
            <View style={styles.safeArea}>

                {/* Header */}

                <View style={styles.header}>
                    <Text style={{ color: "white" }}>Header</Text>
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
                        <TouchableOpacity>
                            <Text>DECONNEXION</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.endRow}>
                        <TouchableOpacity>
                            <Text>SUPPRIMER MON COMPTE</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* Footer  */}

                <View style={styles.footer}>
                    <Text style={{ color: "white" }}>Footer</Text>
                </View>

            </View>
        )
    }
}


