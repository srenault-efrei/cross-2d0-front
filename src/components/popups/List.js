import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';

export default class CustomText extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const test = this.props.title
    return (
        <View>
          <Text>{test}</Text>
        </View>
      )
  }
}

CustomText.propTypes = { title: PropTypes.string.isRequired };
