import React, { PureComponent, PropTypes } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text
} from 'react-native';

import { Marker as MapMarker, Callout } from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  callout: {
    width: 300
  }
});

class Marker extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(props) {
    if (this.props.active) {
      setTimeout(() => {
        this.marker.showCallout()
      }, 1);
    }
  }

  render() {
    const { position, title, description, size, icon, children, ...rest  } = this.props;

    return (
      <MapMarker
        coordinate={ position }
        ref={ (marker) => this.marker = marker }
        {...rest}
      >
        { icon? <Icon name={ icon } size={ size } /> : null }

        <Callout style={ styles.callout }>
          { title? <Text>{ title }</Text> : null }
          { description? <Text>{ description }</Text> : null }
          { children }
        </Callout>
      </MapMarker>
    );
  }
}

Marker.propTypes = {
  position: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }),
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.number
}

Marker.defaultProps = {
  size: 30
}

export default Marker;