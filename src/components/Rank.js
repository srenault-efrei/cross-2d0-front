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
        this.state = {
            customers: [],
            user: [],
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmMzhlYzU2LTc3NTctNDJkNy04ZjEzLWNjYTFkZjJmNzgwYyIsImZpcnN0bmFtZSI6IlN0ZXZlbiIsImlhdCI6MTU5MjQxODAzOX0.lyTW0f0cJrMoiqc4yUn8xQe9Ap865_KMC_2CK-wDeoU"
        }

    }


    async componentDidMount() {
        this.fetchCustomers()
        this.setState({
            user: this.props.route.params.user
        })
    }

    //     unsubscribe = () => {
    //         this.props.navigation.addListener('focus', () => {
    //             this.setState({
    //                 user: this.props.route.params.user
    //             })
    //         })
    //     }

    //    async componentWillUnmount() {
    //         this.unsubscribe();
    //       }

    fetchCustomers = async () => {

        const settings = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
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

    howManyTickets = (tickets) =>{
        let countDonnation = 0
        let countBarter = 0

        for(const ticket of tickets){
            if(ticket.type === 'barter'){
                countBarter++
            }else{
                countDonnation++
            }
        }
        return { "barter" :countBarter, "donnation" :countDonnation }
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



                    {customers.map((customer, idCusto) => (

                        idCusto <= 2 ?
                            <View key={idCusto} style={styles.cardRank}>

                            
                                    <View style={{ flexDirection: "column", width: 75 }}>
                                    <Text>Troc : {this.howManyTickets(customer.tickets).barter}</Text>
                                        <Text>Dons : {this.howManyTickets(customer.tickets).donnation}</Text>
                                    </View>
                             

                                <View style={{ flexDirection: "column", paddingLeft: 30, paddingRight: 30 }}>
                                    <Text style={{ color: "gray" }}>{customer.firstname} {customer.lastname}</Text>
                                    <Text style={{ fontWeight: "bold" }}>{customer.rank.title} </Text>
                                </View>

                                <View style={{ flexDirection: "column", paddingLeft: 30 }}>
                                    <Text style={{ fontSize: 35, color: "gray", fontWeight: "bold" }}>#{idCusto + 1}</Text>

                                </View>

                            </View>
                            : <View></View>

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

                                <View style={{ flexDirection: "column", paddingLeft: 30, paddingRight: 30 }}>
                                    <Text style={{ color: "gray" }}>Steven Renault</Text>
                                    <Text style={{ fontWeight: "bold" }}>Fruit du Dragon </Text>
                                </View>

                                <View style={{ flexDirection: "column", paddingLeft: 30 }}>
                                    <Text style={{ fontSize: 35, color: "gray", fontWeight: "bold" }}>#1</Text>

                                </View>

                            </View>
                            : <View></View>

                    ))}

                </View>



                {/* Footer  */}
                <MyFooter type='classic' navigation={navigation} />

            </SafeAreaView>
        )
    }
}


