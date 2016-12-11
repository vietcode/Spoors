import React, { PureComponent, Children } from 'react';
import {
  StyleSheet
} from 'react-native';

import Mapbox, { MapView } from 'react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1Ijoic250cmFuIiwiYSI6ImNpd2dhc2dkMDAxNXcydHA5eXdzZG5qMDYifQ.ehH4hFHyvPlUvZSSk59QFw');

import { encode, decode } from 'polyline';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

class Map extends PureComponent {
  constructor(props) {
    super(props);

    const { center, zoom } = this.props;
    this.state = {
      center,
      zoom,
      userTrackingMode: Mapbox.userTrackingMode.none
    };

  }

  getStyleURL() {
    const hour = (new Date()).getHours();
    return hour > 17? Mapbox.mapStyles.dark : Mapbox.mapStyles.streets;
  }

  render() {
    const { children } = this.props;
    const { center, zoom, userTrackingMode } = this.state;

    // Until this Mapbox library supports annotation view, we do this:
    const annotations = Children.map(children, (child) => {
      let { children, coordinates, ...rest } = child.props;
      if (typeof(coordinates) === "string") {
        coordinates = decode(coordinates);
      }

      let id = child.props.id || encode(coordinates);
      return {
        id,
        ...rest,
        coordinates
      }
    });

    return (
      <MapView
        ref={map => { this._map = map; }}
        style={ styles.map }
        initialCenterCoordinate={ center }
        initialZoomLevel={ zoom }
        initialDirection={ 0 }
        rotateEnabled={ true }
        scrollEnabled={ true }
        zoomEnabled={ true }
        showsUserLocation={ false }
        styleURL={ this.getStyleURL() }
        userTrackingMode={ userTrackingMode }
        annotations={ annotations }
        annotationsAreImmutable
        logoIsHidden={ true }
        attributionButtonIsHidden={ false }
      >

      </MapView>
    );
  }
}



export default Map;