/**
 * A React component to display the Profile header for Sppors.
 *
 * It displays the back button, the menu button depending on the scene
 * and the user mini profile.
 */

import React, { Component, PropTypes as T } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import {
  Title, 
  Content,
  Button, 
  Text,
  Icon,
  List,
  ListItem,
  Thumbnail,
  Badge,
  InputGroup,
  Input
} from 'native-base';

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 15,
    paddingTop: (Platform.OS === 'ios' ) ? 15 : 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    position: 'relative'
  },
  profile: {
    flex: 1
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {viewer} = this.props;

    return(
      <View style={styles.container}>
        <Button transparent>
          <Icon name="ios-arrow-back" />
        </Button>

        <View style={styles.profile}>
          <List>
            <ListItem>
              <Thumbnail size={32} source={{uri: viewer.avatar}} />
              <Text>{ viewer.name }</Text>
              <Text note>Level: { viewer.level }</Text>
            </ListItem>
          </List>
        </View>

        <Button transparent>
            <Icon name="ios-menu" />
          </Button>
      </View>
    );
  }
}

Profile.propTypes = {
  viewer: T.object
}

export default Profile;