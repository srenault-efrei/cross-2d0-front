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
import {Avatar } from 'react-native-elements'


export default class Rank extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            user: [],
        }

        // console.log(this.props.route.params.token)
    }


    async componentDidMount() {
        this.unsubscribe()

    }

    unsubscribe = () => {
        this.props.navigation.addListener('focus', () => {
            this.setState({
                user: this.props.route.params.user,
            })
        })
        this.fetchCustomers()
    }

    async componentWillUnmount() {
        this.unsubscribe();
    }

    fetchCustomers = async () => {

        const settings = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.props.route.params.token,
                'Content-Type': 'application/json',
            }
        };

        try {
            const response = await fetch("https://trocify.herokuapp.com/api/customers", settings);
            const json = await response.json();
            this.setState({ customers: json.data.customer })
        } catch (e) {
            console.log(e)
        }
    }

    howManyTickets = (tickets) => {
        let countDonnation = 0
        let countBarter = 0

        for (const ticket of tickets) {
            if (ticket.type === 'barter') {
                countBarter++
            } else {
                countDonnation++
            }
        }
        return { "barter": countBarter, "donnation": countDonnation }
    }

    render() {
        let countTroc = 0
        const { navigation } = this.props
        const { customers } = this.state
        // console.log(customers)
        return (


            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <MyHeader type='Return' navigation={navigation} />
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
                <View style={styles.view}>

                    <View style={{ marginBottom: 20 }}>
                        <View style={styles.lineRank}></View>
                        <Text> MEILLEURS RANK </Text>
                        <View style={styles.lineRank}></View>

                    </View>



                    {customers.map((customer, idCusto) => (

                        idCusto <= 2 ?
                            <View key={idCusto} style={styles.cardRank}>


                                <View style={{ flexDirection: "column", width: 75 }}>
                                    <Text>Troc : {this.howManyTickets(customer.tickets).barter}</Text>
                                    <Text>Dons : {this.howManyTickets(customer.tickets).donnation}</Text>
                                </View>


                                <View style={{ flexDirection: "column", paddingLeft: 30, paddingRight: 30, width: 200 }}>
                                    <Text style={{ color: "gray" }}>{customer.firstname} {customer.lastname}</Text>
                                    <Text style={{ fontWeight: "bold" }}>{customer.rank.title} </Text>
                                </View>

                                <View style={{ flexDirection: "column", paddingLeft: 30 }}>
                                    <Text style={{ fontSize: 35, color: "gray", fontWeight: "bold" }}>#{idCusto + 1}</Text>

                                </View>

                            </View>
                            : <View key={idCusto}></View>

                    ))}

                </View>


                <View style={{ alignItems: "center" }}>
                    <Text style={{ marginBottom: 5, }}>Mon Rank : </Text>

                    {customers.map((customer, idCustoEnd) => (
                        customer.id === this.state.user.id ?
                            <View key={idCustoEnd} style={styles.cardRank}>


                                <View style={{ flexDirection: "column", width: 75 }}>
                                    <Text>Troc : {this.howManyTickets(customer.tickets).barter}</Text>
                                    <Text>Dons : {this.howManyTickets(customer.tickets).donnation}</Text>
                                </View>

                                <View style={{ flexDirection: "column", paddingLeft: 30, paddingRight: 30, width: 200 }}>
                                    <Text style={{ color: "gray" }}>{customer.firstname} {customer.lastname}</Text>
                                    <Text style={{ fontWeight: "bold" }}>{customer.rank.title} </Text>
                                </View>

                                <View style={{ flexDirection: "column", paddingLeft: 30 }}>
                                    <Text style={{ fontSize: 35, color: "gray", fontWeight: "bold" }}>#{idCustoEnd + 1}</Text>

                                </View>

                            </View>
                            : <View key={idCustoEnd} ></View>

                    ))}

                </View>



                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation} />

            </SafeAreaView>
        )
    }
}


