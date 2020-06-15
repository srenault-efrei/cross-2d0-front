  
import React from 'react'
import { Icon } from 'react-native-elements'
import { Footer, FooterTab, Button, } from 'native-base';
import { TouchableOpacity, Text } from 'react-native'
import { View } from 'native-base'
import styles from '../../../assets/css/header.js'

export default class MyFooter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.type = this.props.type
        this.navigation = this.props.navigation
    }

    classicFooter = 
        <Footer>
            <FooterTab>
            <Button vertical>
                <View style={{position: 'relative', bottom: 6}}>
                <Icon
                  reverse
                  name='ios-funnel'
                  type='ionicon'
                  size={20}
                  color='none'
                />
                </View>
                <Text style={styles.blankText, {position: 'absolute', top:35}}>A proximité</Text>
            </Button>
            <Button vertical>
                <View style={{position: 'relative', bottom: 4}}>
                <Icon
                  reverse
                  name='ios-add-circle'
                  type='ionicon'
                  size={25}
                  color='none'
                />
                </View>
                <Text style={styles.blankText, {position: 'absolute', top:38}}>Ajouter</Text>
            </Button>
            <Button vertical>
                <View style={{position: 'relative', bottom: 5}}>
                <Icon
                  reverse
                  name='comment'
                  type='octicon'
                  size={20}
                  color='none'
                />
                </View>
                <Text style={styles.blankText, {position: 'absolute', top:35}}>Ajouter</Text>
            </Button>
            </FooterTab>
        </Footer>

    organizationFooter = 
        <Footer>
            <FooterTab>
            <Button vertical>
                
                <Text style={styles.blankText}>A proximité</Text>
            </Button>
            <Button vertical>

            </Button>
            <Button vertical active>
                
                <Text style={styles.blankText}>Messages</Text>
            </Button>
            </FooterTab>
        </Footer>

    render() {
        const type = this.type
        let FooterComponent
        if(type === 'classic'){
            FooterComponent =  this.classicFooter
        } else {
            FooterComponent =  this.organizationFooter
        }
        return (
            FooterComponent
        )
    }
}