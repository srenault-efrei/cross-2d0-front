import React from 'react'
import { Text, View, FlatList } from 'react-native'
import global from '../../assets/css/global.js'
import {Card, CheckBox} from 'react-native-elements'

export default class Filters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.navigation = this.props.navigation
    
  }
  static navigationOptions = {
    header: {
    visible: false
    }
    };

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

  render() {
    return (
          <Card title="Filtres">
            <FlatList
                data={this.DATA}
                renderItem={({ item }) => (
                    <View style={global.filters}>
                        <CheckBox
                            center
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checked}
                        />
                        <Text style={global.filterText}>{item.title}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                horizontal={false}
                numColumns={2}
            />
          </Card>
      );
  }
}