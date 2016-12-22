import React, { PureComponent, PropTypes } from 'react';

import { encode, decode } from 'polyline';

class Annotation extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let { coordinates, ...rest } = this.props;
    if (!coordinates) return null;
    
    if (typeof(coordinates) === "string") {
      coordinates = decode(coordinates);
    }

    let id = this.props.id || encode(coordinates);

    return (<View id={ id } { ...rest } coordinates={ coordinates }>

    </View>);
  }
}

export default Annotation;