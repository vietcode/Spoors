import React, { PureComponent, Children } from 'react';
import {
  Platform,
  StyleSheet
} from 'react-native';

import { Fab, Button as NBButton, Icon } from 'native-base';
import _ from 'lodash';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center'
  }
})

class Button extends PureComponent {
  render() {
    let {
      icon,
      size,
      style,
      iconStyle,
      position,
      children,
      ...other
    } = this.props;

    let newChildren = [], hasButtons = false;
    let buttonStyles = [ styles.button, style ];

    if (icon) {
      let iconName = (Platform.OS === 'android'? 'md-' : 'ios-') + icon;
      icon = (<Icon name={ iconName }
        style={ {fontSize: size, ...iconStyle} } key={'icon-' + iconName}
      />);
      newChildren.push(icon);
    }

    Children.forEach(children, (child, index) => {
      if (child.type && child.type.displayName == "Button") {
        newChildren.push(<NBButton {...child.props} key={ index }></NBButton>);
        hasButtons = true;
      }
    })

    if (hasButtons) {
      let containerStyle = {
      };
      if (position === 'bottomMiddle') {
        position = 'bottomRight';
        containerStyle.left = 20;
        containerStyle.right = 20;
      }

      return (
        <Fab active={ true } direction="up" position={ position } 
              containerStyle={ containerStyle }
              {...other} style={ buttonStyles }
        >
          { newChildren }
        </Fab>

      );
    }

    Children.forEach(children, (child, index) => {
      newChildren.push(child);
    });
    if (newChildren.length === 1) {
      newChildren = newChildren[0];
    }

    return (
      <NBButton {...other} style={ buttonStyles }>
        { newChildren }
      </NBButton>
    );
  }
}

export default Button;