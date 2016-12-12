import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
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

    let image = source? <Image style={ styles.image } source={{uri: source.picture}} /> : null;
    let name = source? source.name : 'Vô danh';

    return (
      <Button 
        vertical rounded transparent large
        icon={ source? null : 'contact' }
        style={ styles.container } 
        {...others}>
        <View style={ styles.container }>
          { image }
          <Text>{ name }</Text>
        </View>
      </Button>
    )
  }
}

export default Avatar;