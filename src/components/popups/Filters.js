import React from 'react'
import { View, FlatList, Text } from 'react-native'
import Dialog, { SlideAnimation, ScaleAnimation, FadeAnimation, DialogContent, DialogTitle, DialogFooter, DialogButton } from 'react-native-popup-dialog'
import styles from '../../../assets/css/popups/filters'
import PropTypes from 'prop-types'
import { CheckBox } from 'react-native-elements'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.navigation = this.props.navigation
    this.handler = this.props.handler
  }

  DATA = [
    {
      id: 1,
      title: 'Date d\'ajout',

    },
    {
      id: 2,
      title: 'Note du troquer',

    },
    {
      id: 3,
      title: 'Proximité',

    },
    {
        id: 4,
        title: 'Rank du troquer',
  
    },
  ];

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
                    checked={this.state.checked}
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
            dialogTitle={<DialogTitle title="Filtres" />}
            dialogAnimation={new ScaleAnimation({
              initialValue: 0,
              useNativeDriver: true,
            })}
            footer={
              <DialogContent>
                <DialogButton
                  text="FERMER"
                  onPress={() => this.handler()}
                />
                <DialogButton
                  text="RÉINITIALISER"
                  onPress={() => this.handler()}
                />
              </DialogContent>
            }
            onTouchOutside={() => {
            this.setState({ visible: false })
            }}
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