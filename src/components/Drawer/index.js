import React, { PureComponent, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

import { List, ListItem, Icon, Text, Badge } from 'native-base';

import { APPBAR_HEIGHT, STATUSBAR_HEIGHT } from '../../constants/Theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: STATUSBAR_HEIGHT + 10,
    paddingRight: 20
  }
});

function getIcon(name) {
  return (Platform.OS === 'android'? 'md-' : 'ios-') + name;
}

class DrawerContent extends PureComponent {

  navigate = (scene) => {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key: scene.toLowerCase(),
        title: scene
      }
    });
  }

  render() {
    const { handleNavigate } = this.props;

    return (
      <View style={ styles.container }>
        <List>
          <ListItem iconLeft>
            <Icon name={ getIcon("globe") } />
            <Text>My Trips</Text>
            <Badge>2</Badge>
          </ListItem>
          <ListItem iconLeft>
            <Icon name={ getIcon("contacts") } />
            <Text>Friends</Text>
            <Badge>22</Badge>
          </ListItem>
          <ListItem iconLeft button onPress={ this.navigate.bind(this, 'Settings') }>
            <Icon name={ getIcon("settings") } />
            <Text>Settings</Text>
          </ListItem>
        </List>
      </View>
    )
  }
}

DrawerContent.propTypes = {
}

DrawerContent.defaultProps = {
}

export default DrawerContent;