import React from 'react'
import { View, FlatList } from 'react-native'
import { List } from 'react-native-paper';
import Dialog, { ScaleAnimation, DialogContent, DialogTitle, DialogButton } from 'react-native-popup-dialog'
import styles from '../../../assets/css/popups/notifications'
import PropTypes from 'prop-types'

export default class Notifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false }
    this.navigation = this.props.navigation
    this.handler = this.props.handler
  }

  list = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Hey, je voudrais te proposer un échange.'
    },
    {
      name: 'Chris Jackson',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'J\'ai vu ton annonce et je suis intéressé, on peut en discuter ?'
    },
  ]

  renderRow () {
    return (
      <FlatList
      data={this.list}
      renderItem={({ item }) => (
        <List.Item 
          onPress={() => console.log('item pressed!')}
          title={item.name}
          descriptionNumberOfLines={1}
          description={item.subtitle}
          left={() => <List.Icon 
                        icon={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} 
                        style={styles.roundedFull}
                      />
          }
        />
      )}
      keyExtractor={item => item.name}
    />
    )
  }

  render() {
    return (
        <View style={styles.container}>
        <Dialog
            width={300}
            visible={this.props.visible}
            dialogTitle={<DialogTitle title="Notifications" />}
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

Notifications.propTypes = { visible: PropTypes.bool.isRequired, handler: PropTypes.func.isRequired }
