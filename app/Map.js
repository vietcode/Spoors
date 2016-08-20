import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Slider
} from 'react-native';
import {
  Text,
  Card,
  CardItem,
  Icon
} from 'native-base';

import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flexDirection:'row'
  },
  map: {
    height: 300,
    backgroundColor: 'red'
  }
});

class Map extends Component {
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
      },
      date: new Date()
    };

    this.targetDropped = this.targetDropped.bind(this);
  }

  targetDropped(e) {
    this.setState({ target: e.nativeEvent.coordinate });
  }

  render() {
    let { region, target, date } = this.state;
    
    return (
      <Card>
        <CardItem>
          <Text>Upcoming trips</Text>
          <Text note>{ date.toLocaleDateString() }</Text>
        </CardItem>

        <CardItem cardBody>
          <MapView style={styles.map}
            region={region}
            showsTraffic={false}
            loadingEnabled={true}
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
        </CardItem>

        <CardItem>
          <Icon name={'ios-play'} />
          <Slider style={{ flex: 1 }}
          {...this.props}
          onValueChange={(value) => this.setState({value: value})} />
        </CardItem>
      </Card>
    );
  }
}

export default Map;