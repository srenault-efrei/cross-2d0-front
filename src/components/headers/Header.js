  
import React from 'react'
import { Header, Icon } from 'react-native-elements'
import { TouchableOpacity, Text } from 'react-native'
import { View } from 'native-base'
import styles from '../../../assets/css/header.js'

export default class MyHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.type = this.props.type
        this.navigation = this.props.navigation
    }

    rightContent = 
        <View style={styles.horizontalList}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.navigation.navigate('Search')}
          >
          <Icon
            reverse
            name='ios-funnel'
            type='ionicon'
            color='rgb(63, 81, 181)'
            size={25}
          />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.navigation.navigate('Search')}
          >
          <Icon
            reverse
            name='ios-search'
            type='ionicon'
            color='rgb(63, 81, 181)'
            size={25}
          />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.navigation.navigate('Search')}
          >
          <Icon
            reverse
            name='ios-map'
            type='ionicon'
            color='rgb(63, 81, 181)'
            size={25}
          />
          </TouchableOpacity>
        </View>

    leftContent = 
        <View style={{marginBottom:20}}>
          <Icon
            reverse
            name='ios-notifications-outline'
            type='ionicon'
            color='rgb(63, 81, 181)'
            size={25}
          />
        </View>

    ProfileHeader = 
      <View>
        <Header
          leftComponent={this.leftContent}
          rightComponent={this.rightContent}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
          }}
        />
      </View>

    addHeader = 
      <View>
        <Header
          leftComponent={this.leftContent}
          rightComponent={this.rightContent}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
          }}
        />
      </View>

    render() {
      const type = this.type
      let HeaderComponent
      if(type === 'Profile'){
        HeaderComponent =  this.ProfileHeader
      } else {
        HeaderComponent =  this.addHeader
      }
      return (
        HeaderComponent
      )
    }
}