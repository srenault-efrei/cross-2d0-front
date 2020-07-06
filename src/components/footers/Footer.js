
import React from 'react'
import { Icon } from 'react-native-elements'
import { Footer, FooterTab, Button } from 'native-base';
import { Text } from 'react-native'
import { View } from 'native-base'
import PropTypes from 'prop-types'

export default class MyFooter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.type = this.props.type
        this.navigation = this.props.navigation
    }

    classicFooter = () => {
        return (
            <Footer style={{ backgroundColor: 'rgb(63, 81, 181)'}}>
                <FooterTab>
                    <Button vertical onPress={() => this.navigation.navigate('Home')}>
                        <View style={{position: 'relative', bottom: 6}}>
                        <Icon
                        reverse
                        name='ios-funnel'
                        type='ionicon'
                        size={20}
                        color='transparent'
                        />
                        </View>
                        <Text style={{position: 'absolute', top:35, color: '#fff'}}>A proximité</Text>
                    </Button>
                    <Button vertical onPress={() => this.navigation.navigate('Add')}>
                        <View style={{position: 'relative', bottom: 4}}>
                        <Icon
                        reverse
                        name='ios-add-circle'
                        type='ionicon'
                        size={25}
                        color='transparent'
                        />
                        </View>
                        <Text style={{position: 'absolute', top:38, color: '#fff'}}>Ajouter</Text>
                    </Button>
                    <Button vertical onPress={() => this.navigation.navigate("Messages")}>
                        <View style={{position: 'relative', bottom: 5}}>
                        <Icon
                        reverse
                        name='comment'
                        type='octicon'
                        size={20}
                        color='transparent'
                        />
                        </View>
                        <Text style={{position: 'absolute', top:35, color: '#fff'}}>Messages</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

    // classic footer without center content
    organizationFooter = () => {
        return (
            <Footer style={{ backgroundColor: 'rgb(63, 81, 181)'}}>
                <FooterTab>
                <Button vertical onPress={() => this.navigation.navigate('Home')}>
                    <View style={{position: 'relative', bottom: 6}}>
                    <Icon
                    reverse
                    name='ios-funnel'
                    type='ionicon'
                    size={20}
                    color='transparent'
                    />
                    </View>
                    <Text style={{position: 'absolute', top:35, color: '#fff'}}>A proximité</Text>
                </Button>
                <Button vertical>

                </Button>
                <Button vertical onPress={() => this.navigation.navigate("Messages")}>
                    <View style={{position: 'relative', bottom: 5}}>
                    <Icon
                    reverse
                    name='comment'
                    type='octicon'
                    size={20}
                    color='transparent'
                    />
                    </View>
                    <Text style={{position: 'absolute', top:35, color: '#fff'}}>Messages</Text>
                </Button>
                </FooterTab>
            </Footer>
        )
    }


    render() {
        const type = this.props.type
        let FooterComponent
        if(type === 'association'){
            FooterComponent =  this.organizationFooter()
        } else if(type === 'classic') {
            FooterComponent =  this.classicFooter()
        }
        return (
            FooterComponent
        )
    }
}

MyFooter.propTypes = { type: PropTypes.string.isRequired, navigation: PropTypes.object.isRequired }
