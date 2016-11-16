import React, { PureComponent, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const MERCATOR_OFFSET = 268435456;
const MERCATOR_RADIUS = 85445659.44705395;
const M_PI = Math.PI;

const { width, height } = Dimensions.get('window');

function longitudeToPixelSpaceX(longitude) {
  return Math.round(MERCATOR_OFFSET + MERCATOR_RADIUS * longitude * M_PI / 180.0);
}
function latitudeToPixelSpaceY(latitude) {
  return Math.round(MERCATOR_OFFSET - MERCATOR_RADIUS * Math.log((1 + Math.sin(latitude * M_PI / 180.0)) / (1 - Math.sin(latitude * M_PI / 180.0))) / 2.0);
}
function pixelSpaceXToLongitude(pixelX) {
  return ((Math.round(pixelX) - MERCATOR_OFFSET) / MERCATOR_RADIUS) * 180.0 / M_PI;
}
function pixelSpaceYToLatitude(pixelY) {
  return (M_PI / 2.0 - 2.0 * Math.atan(Math.exp((Math.round(pixelY) - MERCATOR_OFFSET) / MERCATOR_RADIUS))) * 180.0 / M_PI;
}

function zoomLevelToCoordinateSpan({longitude, latitude}, zoomLevel, {mapWidth, mapHeight}) {
  // convert center coordiate to pixel space
  let centerPixelX = longitudeToPixelSpaceX(longitude);
  let centerPixelY = latitudeToPixelSpaceY(latitude);
  // determine the scale value from the zoom level
  let zoomExponent = 20 - zoomLevel;
  let zoomScale = Math.pow(2, zoomExponent);
  // scale the map’s size in pixel space
  let scaledMapWidth = width * zoomScale;
  let scaledMapHeight = height * zoomScale;
  // figure out the position of the top-left pixel
  let topLeftPixelX = centerPixelX - (scaledMapWidth / 2);
  let topLeftPixelY = centerPixelY - (scaledMapHeight / 2);
  // find delta between left and right longitudes
  let minLng = pixelSpaceXToLongitude(topLeftPixelX);
  let maxLng = pixelSpaceXToLongitude(topLeftPixelX + scaledMapWidth);
  let longitudeDelta = maxLng - minLng;
  // find delta between top and bottom latitudes
  let minLat = pixelSpaceYToLatitude(topLeftPixelY);
  let maxLat = pixelSpaceYToLatitude(topLeftPixelY + scaledMapHeight);
  let latitudeDelta = -1 * (maxLat - minLat);

  return {latitudeDelta, longitudeDelta}
}

const ASPECT_RATIO = width / height;
const LATITUDE = 10.3214142;
const LONGITUDE = 107.0827768;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };

    this.targetDropped = this.targetDropped.bind(this);
  }

  targetDropped(e) {
    this.setState({ target: e.nativeEvent.coordinate });
  }

  _renderLocation(location) {
    const { position, formattedAddress } = location;
    const { lat, lng } = position;

    return (
      <Marker key={ formattedAddress }
              coordinate={ { latitude: lat, longitude: lng} }
              title={ formattedAddress }
              ref={ location.ref }
      >

      </Marker>
    )
  }

  render() {
    const { center, zoom, children } = this.props;
    const { date } = this.state;

    const { latitudeDelta, longitudeDelta } = 
              zoomLevelToCoordinateSpan(center, zoom, Dimensions.get('window'));

    if (Platform.OS === 'web') {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.web.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload
          </Text>
        </View>
      );
    } else {
      return (
        <MapView style={styles.map}
          region={{ ...center, latitudeDelta, longitudeDelta }}
          showsTraffic={false}
          loadingEnabled={true}
          showsUserLocation={false}
          followsUserLocation={false}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
          showsCompass={true}
          showsScale={true}
          rotateEnabled={false}
        >
          { children }
        </MapView>
      );
    }
  }
}

Map.propTypes = {
  center: PropTypes.shape({
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired
  }),
  zoom: PropTypes.number.isRequired,
  pointOfInterest: PropTypes.object
}

Map.defaultProps = {
  center: { latitude: LATITUDE, longitude: LONGITUDE },
  zoom: 5
}

export default Map;