import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  Platform
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';

const styles = StyleSheet.create({
  container: {
    
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  name: {
    fontSize: 10
  },
  icon: {
    fontSize: (Platform.OS === 'ios' ) ? 30 : 28
  }
});

class Icon extends PureComponent {
  componentWillMount() {
    this.Icon = Icon.fromFamily(this.props.family);
  }

  componentWillUpdate(nextProps) {
    this.Icon = Icon.fromFamily(nextProps.family);
  }

  render() {
    const { name, family, style, ...props } = this.props;
    let iconName = (family === 'Ionicons'? (Platform.OS === 'android'? 'md-' : 'ios-') : '') + name;

    return (
      <this.Icon name={ iconName } style={ [ styles.icon, style] } { ...props }/>
    )
  }
}

Icon.fromFamily = (family = 'Ionicons') => {
  let icon;

  switch(family) {
    case 'Ionicons':
      icon = Ionicons;
      break;
    case 'Entypo':
      icon = Entypo;
      break;
    case 'FontAwesome':
      icon = FontAwesome;
      break;
    case 'Foundation':
      icon = Foundation;
      break;
    case 'MaterialIcons':
      icon = MaterialIcons;
      break;
    case 'MaterialCommunityIcons':
      icon = MaterialCommunityIcons;
      break;
    case 'Octicons':
      icon = Octicons;
      break;
    case 'Zocial':
      icon = Zocial;
      break;
    default:
      icon = Ionicons;
  }

  return icon;
}

Icon.getImageSource = (name, size, color, family = 'Ionicons') => {
  return Icon.fromFamily(family).getImageSource(name, size, color);
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  family: PropTypes.string
}

Icon.defaultProps = {
  family: 'Ionicons'
}

export default Icon;