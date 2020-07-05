import React from 'react'
import { Text, View, SafeAreaView, YellowBox } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/details.js'
import { SliderBox } from "react-native-image-slider-box"
import MapView from 'react-native-maps'
import { Button } from 'react-native-paper'
import PropTypes from 'prop-types'
const moment = require('moment')
const now = moment().format('YYYY-MM-DD hh:mm:ss')
import _ from 'lodash'

YellowBox.ignoreWarnings(['componentWillReceiveProps'])
const _console = _.clone(console)
console.warn = message => {
  if (message.indexOf('componentWillReceiveProps') <= -1) {
  _console.warn(message);
  } 
}

export default class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree", // Network image
                // Local image = require('file')
            ],
            isVisibleNotifs: false, 
            isVisibleFilters: false,
            product: this.props.route.params.product
        }
        this.navigation = this.props.navigation
    }
    
    componentDidMount() {
        this.checkParams()
        this.getMoment()
    }

    /*   async setDataStorage() {
    let user = await AsyncStorage.getItem('user')
    let token = await AsyncStorage.getItem('token')
    if (!user) {
      this.props.navigation.navigate("SignIn")
    } 
    else if (user && token) {
        this.setState({ user, token })
    }
    } */

    componentWillReceiveProps() {
        if (this.props.route.params){
            console.log(this.props.route.params)
          } else {
            console.log(this.props.route.params)
        }
    }

    getMoment(){
        const {product} = this.state
        const date = product.createdAt
        const newDate = date.replace('T', ' ').split('.')[0]
        const ms = moment(now,"YYYY-MM-DD HH:mm:ss").diff(moment(newDate,"YYYY-MM-DD HH:mm:ss"))
        const d = moment.duration(ms)
        
        if (d.days() != 0){
            if (Math.abs(d.days()) > 1){
                this.setState({ time: Math.abs(d.days()) + ' jours' })
            } else {
                this.setState({ time: Math.abs(d.days()) + ' jour' })
            }
        } 
        else if (d.hours() != 0){
            if (Math.abs(d.hours()) > 1){
                this.setState({ time: Math.abs(d.hours()) + ' heures' })
            } else {
                this.setState({ time: Math.abs(d.hours()) + ' heure' })
            }
        } 
        else if (d.minutes() != 0){
            if (Math.abs(d.minutes()) > 1){
                this.setState({ time: Math.abs(d.minutes()) + ' minutes' })
            } else {
                this.setState({ time: Math.abs(d.minutes()) + ' minute' })
            }
        } 
        else if (d.seconds() != 0){
            if (Math.abs(d.seconds()) > 1){
                this.setState({ time: Math.abs(d.seconds()) + ' secondes' })
            } else {
                this.setState({ time: Math.abs(d.seconds()) + ' seconde' })
            }
        }
        else if (d.months() != 0){
            this.setState({ time: Math.abs(d.months()) + ' mois' })
        }  
        else if (d.years() != 0){
            if (Math.abs(d.years()) > 1){
                this.setState({ time: Math.abs(d.years()) + ' ans' })
            } else {
                this.setState({ time: Math.abs(d.years()) + ' an' })
            }
        }  
        else {
            this.setState({ time: 'à l\'instant' })
        }
    }

    checkParams(){
        if (this.props.route.params.product == undefined || this.props.route.params.product == '') {
        this.navigation.goBack()
        }
    }

    static navigationOptions = {
        header: {
            visible: false
        }
    }

    /*   footerType = () => {
    if (this.state.user.type === 'customer') {
      return <MyFooter type='classic' navigation={this.navigation}/>
    } else {
      return <MyFooter type='Association' navigation={this.navigation}/>
    }
    } */

    render() {
        const {product} = this.state
        return (
            <SafeAreaView style={styles.bdy}>
            <MyHeader type='back' navigation={this.navigation}/>
            <View style={styles.container}>
                <View style={styles.slider}>
                    <SliderBox
                        images={this.state.images}
                        sliderBoxHeight={200}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor="#fff"
                        inactiveDotColor="#90A4AE"
                        autoplay
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 15,
                            marginHorizontal: 10,
                            padding: 0,
                            margin: 0,
                        }}
                    />
                </View>
                    
                <View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.italic}>Posté par <Text style={styles.bold}>{product.user.firstname}</Text></Text>
                            <Text style={styles.italic}>{this.state.time}</Text>
                        </View>

                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{product.title}</Text>
                            <Text>{product.category.title}</Text>
                        </View>

                        <View style={styles.descContainer}>
                            <Text style={styles.italic}>"{product.description}"</Text>
                        </View>

                    </View>
                </View>

                <View style={styles.mapContainer}>
                    <MapView style={styles.mapStyle} />
                </View>

                <View style={styles.buttonContainer}>
                    <Button icon="autorenew" mode="outlined" onPress={() => console.log('Pressed')} color='rgb(63, 81, 181)'>
                        Proposer un échange
                    </Button>
                </View>

            </View>
            <MyFooter type='classic' navigation={this.navigation}/>
            </SafeAreaView>
        )
    }
}

Product.propTypes = { product: PropTypes.object }