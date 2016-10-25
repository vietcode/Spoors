import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import Button from './index';

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});

class Avatar extends Component {
  render() {
    let {source, ...others} = this.props;

    return (
      <Button style={ styles.container } {...others}>
        <Image
          style={ styles.image }
          source={{uri: source}}
        />
      </Button>
    )
  }
}

export default Avatar;