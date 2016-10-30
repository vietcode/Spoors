import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class Button extends Component {
  render() {
    let { 
      children, style,
      ...other
    } = this.props;

    return (
      <TouchableOpacity
        {...other}
      >
        <Text style={ [styles.button, style] }>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }
}

export default Button;