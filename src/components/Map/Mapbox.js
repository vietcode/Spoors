import React, { PureComponent, Children } from 'react';
import {
  StyleSheet
} from 'react-native';

import Mapbox, { MapView } from 'react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1Ijoic250cmFuIiwiYSI6ImNpd2dhc2dkMDAxNXcydHA5eXdzZG5qMDYifQ.ehH4hFHyvPlUvZSSk59QFw');

import { encode, decode } from '@mapbox/polyline';

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

  easeTo({latitude, longitude}, animated) {
    this._map.easeTo({latitude, longitude}, animated);
  }

  getStyleURL() {
    const hour = (new Date()).getHours();
    return hour > 17? Mapbox.mapStyles.dark : Mapbox.mapStyles.streets;
  }

  componentDidUpdate(prevProps, prevState) {
    const { mode, center } = this.props;
    if (!this.state.center && center) {
      const { latitude, longitude } = center;
      this._map.easeTo({
        latitude,
        longitude 
      });
      this.setState({
        center: center
      });
    }
  }

  render() {
    const { children, ...mapProps } = this.props;
    const { center, zoom, userTrackingMode } = this.state;

    // Until this Mapbox library supports annotation view, we do this:
    const annotations = Children.map(children, (child) => {
      if (!child) return child;
      
      let { children, coordinates, icon, size, ...rest } = child.props;
      if (!coordinates) return null;
      if (typeof(coordinates) === "string") {
        coordinates = decode(coordinates);
      }

      let id = child.props.id || encode(coordinates);
      let annotation = {
        id,
        ...rest,
        coordinates
      };

      if (icon && size) {
        annotation.annotationImage = {
          source: icon,
          width: size,
          height: size
        }
      }
      return annotation;
    });

    return (
      <MapView
        ref={ map => { this._map = map; }}
        style={ styles.map }
        initialCenterCoordinate={ center }
        initialZoomLevel={ zoom }
        initialDirection={ 0 }
        rotateEnabled={ false }
        scrollEnabled={ true }
        zoomEnabled={ true }
        showsUserLocation={ false }
        styleURL={ this.getStyleURL() }
        userTrackingMode={ userTrackingMode }
        annotations={ annotations }
        annotationsAreImmutable
        logoIsHidden={ true }
        compassIsHidden={ true }
        attributionButtonIsHidden={ false }
        {...mapProps}
      >

      </MapView>
    );
  }
}



export default Map;