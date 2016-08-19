import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

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

class Spoors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 10.776498,
        longitude: 106.6952740,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      target: {
        latitude: 10.776498,
        longitude: 106.6952740
      }
    };

    this.targetDropped = this.targetDropped.bind(this);
  }

  targetDropped(e) {
    this.setState({ target: e.nativeEvent.coordinate });
  }

  render() {
    let { region, target } = this.state;

    return(
      <View style={styles.container}>
        <MapView style={styles.map}
          region={region}
          showsTraffic={false}
        >
          
          <Marker
            coordinate={region}
            pinColor="blue"
          />

          <Marker draggable
            coordinate={ target }
            onDragEnd={this.targetDropped}
            description={`${target.latitude} - ${target.longitude}`}
          >
          </Marker>

        </MapView>
      </View>
    );
  }
}

export default Spoors;