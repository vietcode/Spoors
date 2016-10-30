import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  input: {
    height: 70,
    backgroundColor: '#22a3ed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: 'white'
  }
})

class Input extends Component {
  render() {
    const props = this.props;
    let {children, ...other} = props;
    const style = this.props.style || {};

    let maybeIcon = props.icon? <Icon name={props.icon} /> : null;

    return (
      <View style={ styles.container }>
        { maybeIcon }
        <TextInput
          {...other}
        />
      </View>
    )
  }
}

export default Input;