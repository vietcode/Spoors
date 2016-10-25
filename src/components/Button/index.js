import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    height: 70,
    backgroundColor: '#22a3ed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white'
  }
})

class Button extends Component {
  render() {
    let {children, ...other} = this.props;
    const style = this.props.style || {};

    return (
      <TouchableOpacity
        {...other}
      >
        {children}
      </TouchableOpacity>
    )
  }
}

export default Button;