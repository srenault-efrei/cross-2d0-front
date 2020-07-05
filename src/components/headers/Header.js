import React from 'react'
import { Header, Icon } from 'react-native-elements'
import { TouchableOpacity, Text } from 'react-native'
import { View } from 'native-base'
import styles from '../../../assets/css/header.js'
import global from '../../../assets/css/global'
import PropTypes from 'prop-types'
import Notifications from '../popups/Notifications'
import Filters from '../popups/Filters'
import { Searchbar, Button } from 'react-native-paper'

export default class MyHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {isVisibleNotifs: false, isVisibleFilters: false, search: global.hidden, profile: styles.circle}
        this.type = this.props.type
        this.navigation = this.props.navigation
        this.handlerNotifs = this.handlerNotifs.bind(this)
        this.handlerFilters = this.handlerFilters.bind(this)
        this.search = this.props.search
    }

    // handlers
    handlerNotifs() {
      this.setState({ isVisibleNotifs: false })
    }
  
    handlerFilters() {
      this.setState({ isVisibleFilters: false })
    }
    
    showNotifs() {
      this.setState({ isVisibleNotifs: true })
    }
  
    showFilters() {
      this.setState({ isVisibleFilters: true })
    }

    showSearchBar(){
      const {search, profile} = this.state
      if (search == global.hidden){
        this.setState({search: global.show, profile: global.hidden})
      } else {
        this.setState({search: global.hidden, profile: styles.circle})
      }
    }
    // /handlers

    rightContent = (content) => {
      if (content == 'none') {
        return null
      } 
      else if (content == 'filterSearch') {
        return (
          <View style={styles.horizontalList}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.showFilters()}
            >
            <Icon
              reverse
              name='ios-funnel'
              type='ionicon'
              color='rgb(63, 81, 181)'
              size={20}
            />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.showSearchBar()}
            >
            <Icon
              reverse
              name='ios-search'
              type='ionicon'
              color='rgb(63, 81, 181)'
              size={20}
            />
            </TouchableOpacity>
          </View>
        )
      } 
      else if (content == 'rightProfile'){
        return (
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
        )
      }
      else if (content == 'rightAsso'){
        return (
          <View style={styles.horizontalList}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.showFilters()}
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
              onPress={() => this.showSearchBar()}
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
        )
      }
      else {
        return (
          <View style={styles.horizontalList}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.showFilters()}
            >
            <Icon
              reverse
              name='ios-funnel'
              type='ionicon'
              color='rgb(63, 81, 181)'
              size={20}
            />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.showSearchBar()}
            >
            <Icon
              reverse
              name='ios-search'
              type='ionicon'
              color='rgb(63, 81, 181)'
              size={20}
            />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.navigation.navigate('Map')}
            >
            <Icon
              reverse
              name='ios-map'
              type='ionicon'
              color='rgb(63, 81, 181)'
              size={20}
            />
            </TouchableOpacity>
          </View>
        )
      }
    }

    centerContent = (content) => {
      if (content!= undefined && content != '') {
        return (
          <View style={styles.titleContainer}>
            <Text style={styles.textWhite}>{content}</Text>
          </View>
        )
      }
      else {
        return (
          <TouchableOpacity style={this.state.profile} onPress={() => this.navigation.navigate('Profil')}>
            <Text>IMG</Text>
            <Text>Profile</Text>
          </TouchableOpacity>
        )
      }
    }

    leftContent = (icon) => {
      if (icon == 'bell') {
        // return bell icon
        return (
          <View style={{marginBottom:20}}>
            <Icon
              onPress={() => this.showNotifs()}
              reverse
              name='ios-notifications-outline'
              type='ionicon'
              color='rgb(63, 81, 181)'
              size={20}
            />
          </View>
        )
      } 
      else if (icon == 'back'){
        // return back icon
          return (
            <View style={{marginBottom:20}}>
              <Icon
                onPress={() => this.navigation.goBack()}
                reverse
                name='ios-arrow-back'
                type='ionicon'
                color='rgb(63, 81, 181)'
                size={20}
              />
            </View>
          )
      } 
      else if (icon == 'leftAsso'){
        return (
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
        )
      }
      else {
        // return both icons (bell and back)
        return (
          <View style={styles.leftHorizontalList}>
            <TouchableOpacity
              style={styles.leftButtons}
              onPress={() => this.navigation.goBack()}
            >
              <Icon
                reverse
                name='ios-arrow-back'
                type='ionicon'
                color='rgb(63, 81, 181)'
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.leftButtons}
              onPress={() => this.showNotifs()}
            >
              <Icon
                reverse
                name='ios-notifications-outline'
                type='ionicon'
                color='rgb(63, 81, 181)'
                size={20}
              />
            </TouchableOpacity>
          </View>       
        )
      }
    }
    
    // bell for the left side, profile image on the center, filter-search-map for the right side
    classicHeader = () => (
      <View>
        <Header
          leftComponent={this.leftContent('bell')}
          rightComponent={this.rightContent()}
          centerComponent={this.centerContent()}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
            height: 60,
          }}
        />
        <View style={global.hidden}>
          <Notifications visible={this.state.isVisibleNotifs} handler={this.handlerNotifs.bind(this)} />
          <Filters visible={this.state.isVisibleFilters} handler={this.handlerFilters.bind(this)}/>
        </View>
        <View style={this.state.search}>
        <Searchbar
          placeholder="Type Here..."
          onChangeText={text => this.search(text)}
          clearIcon={() => <Icon name='ios-close' type='ionicon' onPress={() => console.log('clear')}/> }
        />
          <Button icon="magnify" mode="contained" style={{backgroundColor: 'rgb(63, 81, 181)'}} onPress={() => this.navigation.navigate('Search')}>
            Recherche avancée
          </Button>
        </View>
      </View>
    )
    
    // back for the left side, profile image on the center, filter-search-map for the right side
    classicBackHeader = () => (
      <View>
        <Header
          leftComponent={this.leftContent('back')}
          rightComponent={this.rightContent()}
          centerComponent={this.centerContent()}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
            height: 60,
          }}
        />
        <View style={global.hidden}>
          <Filters visible={this.state.isVisibleFilters} handler={this.handlerFilters.bind(this)}/>
        </View>
      </View>
    )

    // back for the left side, profile image on the center, nothing on the right side
    backHeader = () => (
      <View>
        <Header
          leftComponent={this.leftContent('back')}
          rightComponent={this.rightContent('none')}
          centerComponent={this.centerContent()}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
            height: 60,
          }}
        />
      </View>
    )

    // bell for the left side, profile image on the center, nothing on the right side
    bellHeader = () => (
      <View>
        <Header
          leftComponent={this.leftContent('bell')}
          rightComponent={this.rightContent('none')}
          centerComponent={this.centerContent()}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
            height: 60,
          }}
        />
        <View style={global.hidden}>
          <Notifications visible={this.state.isVisibleNotifs} handler={this.handlerNotifs.bind(this)} />
        </View>
      </View>
    )

    // back and bell for the left side, profile image on the center, nothing on the right side
    backBellHeader = () => (
      <View>
        <Header
          leftComponent={this.leftContent()}
          rightComponent={this.rightContent('none')}
          centerComponent={this.centerContent()}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
            height: 60,
          }}
        />
        <View style={global.hidden}>
          <Notifications visible={this.state.isVisibleNotifs} handler={this.handlerNotifs.bind(this)} />
        </View>
      </View>
    )
    
    // specific header for the add Page
    addHeader = () => (
      <View>
        <Header
          leftComponent={this.leftContent('bell')}
          rightComponent={this.rightContent('none')}
          centerComponent={this.centerContent('AJOUTER UN PRODUIT')}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
            height: 60
          }}
        />
      </View>
    )

    rightContentProfile = () => (
      <View>
        <Header
          leftComponent={this.leftContent()}
          rightComponent={this.rightContent('rightProfile')}
          centerComponent={this.centerContent()}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
            height: 60
          }}
        />
      </View>
    )

    contentAsso = () => (
      <View>
        <Header
          leftComponent={this.leftContent('leftAsso')}
          rightComponent={this.rightContent('rigthAsso')}
          centerComponent={this.centerContent()}
          containerStyle={{
            backgroundColor: 'rgb(63, 81, 181)',
            height: 60
          }}
        />
      </View>
    )

    render() {
      const type = this.props.type
      let HeaderComponent
      if(type === 'classic'){
        HeaderComponent =  this.classicHeader()
      } else if(type === 'backClassic'){
        HeaderComponent =  this.classicBackHeader()
      } else if (type === 'bell') {
        HeaderComponent =  this.bellHeader()
      } else if (type === 'back') {
        HeaderComponent =  this.backHeader()
      } else if (type === 'backBell') {
        HeaderComponent =  this.backBellHeader()
      } else if (type === 'add') {
        HeaderComponent =  this.addHeader()
      }
      else if (type === 'Profile') {
        HeaderComponent =  this.rightContentProfile()
      }
      else if (type === 'Association') {
        HeaderComponent =  this.contentAsso()
      }
      else if ( type == 'Return'){
        HeaderComponent = this.backHeader()
      }
      return (
        HeaderComponent
      )
    }
}

MyHeader.propTypes = { type: PropTypes.string.isRequired }