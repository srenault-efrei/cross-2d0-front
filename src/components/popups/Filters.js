import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import Dialog, { ScaleAnimation, DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog'
import styles from '../../../assets/css/popups/filters'
import PropTypes from 'prop-types'
import { CheckBox } from 'react-native-elements'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      visible: false, 
      name: '' 
    }
    this.navigation = this.props.navigation
    this.handler = this.props.handler
  }

  tab = [false, false, false, false]

  DATA = [
    {
      id: 1,
      title: 'Date d\'ajout',
      name: 'Date'
    },
    {
      id: 2,
      title: 'Note du troquer',
      name: 'Note'
    },
    {
      id: 3,
      title: 'Proximité',
      name: 'Proximite'
    },
    {
      id: 4,
      title: 'Rank du troquer',
      name: 'Rank'
    },
  ]

  handleChange = (item) => {
    const id = item.id
    this.tab[id-1] = !this.tab[id-1]
  }

  renderRow () {
    return (
    <FlatList
        data={this.DATA}
        renderItem={({ item }) => (
            <View style={styles.filters}>
                <CheckBox
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.tab[item.id-1]}
                    onPress={() => this.handleChange(item)}
                />
                <Text style={styles.filterText}>{item.title}</Text>
            </View>
        )}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
    />
    )
  }

  render() {
    return (
        <View style={styles.container}>
        <Dialog
            width={300}
            visible={this.props.visible}
            dialogTitle={
              <View style={styles.dialogHead}>
                <DialogTitle textStyle={styles.white} title="Filtres" style={styles.titleContainer} />
                <Icon name='close-box' color='#fff' type='material-community' size={30} onPress={() => this.handler()} />
              </View>
            }
            dialogAnimation={new ScaleAnimation({
              initialValue: 0,
              useNativeDriver: true,
            })}
            footer={
              <DialogContent>
                <DialogButton
                  text="RÉINITIALISER"
                  onPress={() => this.handler()}
                />
              </DialogContent>
            }
            onTouchOutside={() => this.handler()}
        >
            <DialogContent>
              {this.renderRow()}
            </DialogContent>
        </Dialog>
        </View>
      )
  }
}

Filters.propTypes = { visible: PropTypes.bool.isRequired, handler: PropTypes.func.isRequired }