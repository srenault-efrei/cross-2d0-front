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


export default class Rank extends Component {
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
                <View style={styles.view}>

                    <View style={styles.infosProfile}>
                        <View style={styles.lineRank}></View>
                        <Text> MEILLEURS RANK </Text>
                        <View style={styles.lineRank}></View>

                    </View>
                    <View style={styles.cardRank}>

                        <View style={{ flexDirection: "column", width: 75 }}>
                            <Text>Troc : 200</Text>
                            <Text>Dons : 800 </Text>
                        </View>

                        <View style={{ flexDirection: "column", paddingLeft: 30, paddingRight: 30 }}>
                            <Text style={{ color: "gray" }}>Mathieu Roux</Text>
                            <Text style={{ fontWeight: "bold" }}>Fruit du Dragon </Text>
                        </View>

                        <View style={{ flexDirection: "column", width: 75, paddingLeft: 30 }}>
                            <Text style={{ fontSize: 35, color: "gray", fontWeight: "bold" }}>#1</Text>

                        </View>

                    </View>

                    <View style={styles.cardRank}>

                        <View style={{ flexDirection: "column", width: 75 }}>
                            <Text>Troc : 200</Text>
                            <Text>Dons : 800 </Text>
                        </View>

                        <View style={{ flexDirection: "column", paddingLeft: 30, paddingRight: 30 }}>
                            <Text style={{ color: "gray" }}>Mathieu Roux</Text>
                            <Text style={{ fontWeight: "bold" }}>Fruit du Dragon </Text>
                        </View>

                        <View style={{ flexDirection: "column", width: 75, paddingLeft: 30 }}>
                            <Text style={{ fontSize: 35, color: "gray", fontWeight: "bold" }}>#1</Text>

                        </View>

                    </View>



                    <View style={styles.cardRank}>

                        <View style={{ flexDirection: "column", width: 75 }}>
                            <Text>Troc : 200</Text>
                            <Text>Dons : 800 </Text>
                        </View>

                        <View style={{ flexDirection: "column", paddingLeft: 30, paddingRight: 30 }}>
                            <Text style={{ color: "gray" }}>Mathieu Roux</Text>
                            <Text style={{ fontWeight: "bold" }}>Fruit du Dragon </Text>
                        </View>

                        <View style={{ flexDirection: "column", width: 75, paddingLeft: 30 }}>
                            <Text style={{ fontSize: 35, color: "gray", fontWeight: "bold" }}>#1</Text>

                        </View>

                    </View>

                </View>

              
                <View style={{ alignItems: "center" }}>
                <Text style={{marginBottom:5,}}>Mon Rank : </Text>
                    <View style={styles.cardRank}>

                        <View style={{ flexDirection: "column", width: 75 }}>
                            <Text>Troc : 200</Text>
                            <Text>Dons : 800 </Text>
                        </View>

                        <View style={{ flexDirection: "column", paddingLeft: 30, paddingRight: 30 }}>
                            <Text style={{ color: "gray" }}>Steven Renault</Text>
                            <Text style={{ fontWeight: "bold" }}>Fruit du Dragon </Text>
                        </View>

                        <View style={{ flexDirection: "column", width: 75, paddingLeft: 30 }}>
                            <Text style={{ fontSize: 35, color: "gray", fontWeight: "bold" }}>#1</Text>

                        </View>

                    </View>

                </View>



                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation} />

            </SafeAreaView>
        )
    }
}


