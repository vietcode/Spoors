import React, { PureComponent, PropTypes } from 'react';
import { Polyline } from 'react-native-maps';

import { decode } from 'polyline';

class Route extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let { polyline, ...props } = this.props;
    const coordinates = decode(polyline).map( ([lat, lng]) => {
                          return {latitude: lat,longitude: lng}
                        });
    return (
      <Polyline
        coordinates={ coordinates }
        {...props}
      />
    );
  }
}

Route.propTypes = {
  polyline: PropTypes.string,
  draggable: PropTypes.bool,
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  lineCap: PropTypes.string
}

Route.defaultProps = {
  draggable: false,
  strokeWidth: 1,
  strokeColor: "#000",
  lineCap: "round"
}

export default Route;