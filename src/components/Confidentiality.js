import React, { Component } from 'react'
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';
import MyHeader from './headers/Header'
import styles from '../../assets/styles/styles';
import fr, { confidentiality } from '../../assets/wordings/fr.json';

export default class Confidentiality extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <MyHeader type='Return' navigation={this.navigation} />

                <View style={[styles.topView]}>
                    <Text style={styles.mediumTitle}>CONFIDENTIALITÉ</Text>
                    <View style={[styles.splitter, { width: '50%' }]}></View>
                    {
                        confidentiality.map(paragraph => {
                            const [title, text] = Object.values(paragraph);

                            return <View style={{ justifyContent: 'center' }}>
                                <Text style={styles.smallTitle}>{title}</Text>
                                <Text style={{ textAlign: 'center' }}>{text}</Text>
                            </View>
                        })
                    }
                    <View style={[styles.button, { marginTop: 30 }]}>
                        <Text style={styles.textButton} onPress={() => this.props.navigation.navigate('Home')}>J'accepte</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}