import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,

} from 'react-native'
import styles from '../../assets/styles/profilCusto'


export default class DetailAssociation extends Component {


    render() {
        return (
            <View style={styles.safeArea}>

                {/* Header */}

                <View style={styles.header}>
                    <Text style={{ color: "white" }}>Header</Text>
                </View>

                <View style={styles.view}>
                    <Text style={styles.title}>ASSOCIATION EXAMPLE</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.description}>Illud tamen te esse admonitum volo,
                    primum ut qualis es talem te esse omnes existiment ut, quantum a
                    rerum turpitudine abes, tantum te a verborum libertate seiungas; deinde ut
                    ea in alterum ne dicas, quae cum tibi falso responsa sint, erubescas. Quis est enim,
                    cui via ista non pateat, qui isti aetati atque etiam isti dignitati non possit quam velit petulanter,
                    etiamsi sine ulla suspicione, at non sine argumento male dicere? Sed istarum partium culpa est eorum, qui te
                    agere voluerunt; laus pudoris tui, quod ea te invitum dicere videbamus, ingenii, quod ornate politeque dixisti .
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

                <View style={styles.footer}>
                    <Text style={{ color: "white" }}>Footer</Text>
                </View>

            </View>
        )
    }
}


