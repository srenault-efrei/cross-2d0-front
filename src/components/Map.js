import React from 'react'
import { View, SafeAreaView, Image, YellowBox } from 'react-native'
import MyHeader from './headers/Header'
import MyFooter from './footers/Footer'
import styles from '../../assets/css/map.js'
import MapView, { Marker, Callout } from 'react-native-maps'
import { Card } from 'react-native-paper'
import { Avatar } from 'react-native-elements'
import _ from 'lodash'

YellowBox.ignoreWarnings(['componentWillReceiveProps'])
const _console = _.clone(console)
console.warn = message => {
    if (message.indexOf('componentWillReceiveProps') <= -1) {
        _console.warn(message);
    }
}

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: 48.8566969,
                longitude: 2.3514616,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [
                {
                    id: 1,
                    latlng: {
                        latitude: 48.8582602,
                        longitude: 2.2944991
                    },
                    title: 'Tour Eiffel',
                    description: 'Monument de Paris.',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/81OIkKAb7DL._AC_SL1500_.jpg'
                },
                {
                    id: 2,
                    latlng: {
                        latitude: 48.8925645,
                        longitude: 2.2358742
                    },
                    title: 'La Défense Grande Arche',
                    description: 'Tête de la Défense.',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/71d3fpcwCJL._AC_SL1500_.jpg'
                },
                {
                    id: 3,
                    latlng: {
                        latitude: 48.8707573,
                        longitude: 2.3053312
                    },
                    title: 'Champs Élysées',
                    description: 'En plein Paris.',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/61jYuX2sokL._AC_SL1500_.jpg'
                }
            ],
            data: []
        }
        this.navigation = this.props.navigation

    }

    static navigationOptions = {
        header: {
            visible: false
        }
    }

    componentDidMount = async () => {
        this.fetchTrocs()
    }

    /*     async setDataStorage() {
            let user = await AsyncStorage.getItem('user')
            let token = await AsyncStorage.getItem('token')
            if (!user) {
              this.props.navigation.navigate("Connexion")
            } 
            else if (user && token) {
                this.setState({ user, token })
            }
        } */

    fetchTrocs = async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmMzhlYzU2LTc3NTctNDJkNy04ZjEzLWNjYTFkZjJmNzgwYyIsImZpcnN0bmFtZSI6IkZhYmlhbiIsImlhdCI6MTU5Mjc2NTQ5NX0.PM01TGuPKYB3AW2mEJYRrjna9LhggRp1w-oZsLx-8ZA'
        return fetch(`https://trocify.herokuapp.com/api/tickets`, {
            method: 'GET',
            headers:
                new Headers({
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                })
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    data: json.data.ticket
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    mapStyle = [
        { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
        { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },
        { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
        { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
        { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },
        { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
        { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] },
        { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] },
        { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },
        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },
        { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }]

    /*   footerType = () => {
    if (this.state.user.type === 'customer') {
      return <MyFooter type='classic' navigation={this.navigation}/>
    } else {
      return <MyFooter type='Association' navigation={this.navigation}/>
    }
    } */

    render() {
        const { data } = this.state
        return (
            <SafeAreaView style={styles.bdy}>
                <MyHeader type='back' navigation={this.navigation} />
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
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        region={this.state.region}
                        customMapStyle={this.mapStyle}
                    >
                        {data.map(marker => (
                            <Marker
                                key={marker.id}
                                draggable
                                coordinate={
                                    {
                                        latitude: marker.user.latitude,
                                        longitude: marker.user.longitude
                                    }
                                }
                                onDragEnd={(e) => console.log('closed')}
                                title={marker.title}
                                description={marker.description}
                            >
                                <View style={styles.markView}>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={{ uri: marker.imagesFiles[0] }}
                                    />
                                </View>
                                <Callout style={{ minWidth: 300, minHeight: 50 }} onPress={() => this.navigation.navigate('ProductDetails', { product: marker })}>
                                    <Card>
                                        <Card.Title title={marker.title} subtitle={marker.description} />
                                        <Card.Cover style={{ height: 100, margin: 5 }} source={{ uri: marker.imagesFiles[0] }} />
                                    </Card>
                                </Callout>
                            </Marker>
                        ))}
                    </MapView>
                </View>
                <MyFooter type='classic' navigation={this.navigation} />
            </SafeAreaView>
        )
    }
}