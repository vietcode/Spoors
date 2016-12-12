import React, { Component } from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';

import { Fab, Button, Icon } from 'native-base';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center'
  }
})

class MyButton extends Component {
  render() {
    let {
      icon,
      size,
      style,
      children,
      ...other
    } = this.props;

    let button;
    if (icon) {
      return <Button {...other} style={[ styles.button, style]}>
        <Icon name={ (Platform.OS === 'android'? 'md-' : 'ios-') + icon }
          style={ {fontSize: size} }
        />
        { children || '' }
      </Button>
    } else {
      return <Button {...other}>{ children || '' }</Button>
    };
  }
}

export default MyButton;