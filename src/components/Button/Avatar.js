import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

import Button from './index';

const styles = StyleSheet.create({
  container: {
    
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 25
  },
  name: {
    fontSize: 10
  }
});

class Avatar extends PureComponent {
  render() {
    let {source, color, ...others} = this.props;

    let image = source? <Image style={ styles.image } source={{uri: source.picture}} /> : null;
    let name = source? source.name : 'Sign in';

    return (
      <Button 
        vertical rounded transparent large
        icon={ source? null : 'contact' }
        style={ styles.container } 
        {...others}>
        <View style={ styles.container }>
          { image }
          { 
            source
            &&
            <ProgressBar
              width={ 75 }
              height={ 4 }
              color={ color }
              progress={ source.progress }
            />
          }
          
          <Text style={ [styles.name, { color: color }] }>{ name }</Text>
        </View>
      </Button>
    )
  }
}

export default Avatar;