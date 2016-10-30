import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray', 
    borderWidth: 1
  },
  icon: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    flex: 1,
    height: 40
  }
})

class SearchBar extends Component {
  render() {
    const props = this.props;
    let {children, leftButton, ...other} = props;
    const style = this.props.style || {};

    return (
      <View style={ styles.container }>
        { leftButton }
        <TextInput
          style={ styles.input }
          returnKeyType="next"
          {...other}
        />
        <Button><Icon name="explore" style={ styles.icon } /></Button>
      </View>
    )
  }
}

export default SearchBar;