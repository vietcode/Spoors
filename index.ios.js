/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';

class Spoors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 10.776498,
        longitude: 106.6952740,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    };
  }

  render() {
    let { region } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Spoors!
        </Text>

        <MapView style={styles.map}
          region={region}
        />
        
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Spoors', () => Spoors);
