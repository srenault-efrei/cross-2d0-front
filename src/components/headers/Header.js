
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



  rightContentProfile =

    <View style={styles.horizontalList}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.navigation.navigate('EditProfile')}
      >
        <Icon
          reverse
          name='edit'
          type='material'
          color='rgb(63, 81, 181)'
          size={25}
        />
      </TouchableOpacity>
    </View>

rrightContentAsso =
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
</View>


  leftContent =
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity
        style={styles.button}
      >
        <Icon
          reverse
          name='ios-notifications-outline'
          type='ionicon'
          color='rgb(63, 81, 181)'
          size={25}
        />
      </TouchableOpacity>
    </View>


leftAssoContent =
<View style={{ marginBottom: 20 }}>
  <TouchableOpacity
    style={styles.button}
    onPress={() => this.navigation.goBack()}
  >
    <Icon
      reverse
      name='arrow-left'
      type='foundation'
      color='rgb(63, 81, 181)'
      size={25}
    />
  </TouchableOpacity>
</View>

  homeHeader =
    <View>
      <Header
        leftComponent={this.leftContent}
        
        rightComponent={this.rightContent}
        containerStyle={{
          backgroundColor: 'rgb(63, 81, 181)',
        }}
      />
    </View>

  profileHeader =
    <View>
      <Header
        leftComponent={this.leftContent}
        rightComponent={this.rightContentProfile}
        containerStyle={{
          backgroundColor: 'rgb(63, 81, 181)',
        }}
      />
    </View>


profileAssoHeader =
<View>
  <Header
    leftComponent={this.leftAssoContent}
    rightComponent={this.rrightContentAsso}
    containerStyle={{
      backgroundColor: 'rgb(63, 81, 181)',
    }}
  />
</View>


 returnHeader=
<View>
  <Header
    leftComponent={this.leftAssoContent}
    containerStyle={{
      backgroundColor: 'rgb(63, 81, 181)',
    }}
  />
</View>


  render() {
    const type = this.type
    let HeaderComponent
    if (type === 'Classic') {
      HeaderComponent = this.homeHeader
    } else if ( type === "Profile") {
      HeaderComponent = this.profileHeader
    }else if (type === 'Association'){
      HeaderComponent = this.profileAssoHeader
    }else if ( type == 'Return'){
      HeaderComponent = this.returnHeader
    }
    return (
      HeaderComponent
    )
  }
}