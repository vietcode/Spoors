import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Map from './Map';
import Button from './Button';
import Avatar from './Button/Avatar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  map: {
    flexDirection:'row'
  },
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
});

class ExploreScene extends Component {
  constructor(props) {
    super(props);
    this._openProfile = this._openProfile.bind(this);

    this.state = {

    };
  }

  _openProfile(_event) {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key: 'profile',
        title: 'Profile'
      }
    });
  }

  render() {
    let { viewer } = this.props;

    return(
      <View style={ styles.container }>
        <Map />

        <View style={ styles.toolbar }>
          <Avatar 
            source={ viewer.user.picture }
            onPress={ this._openProfile } />

          <Button>
            <Text>Navigate</Text>
          </Button>

          <Button>
            <Text>Menu</Text>
          </Button>
        </View>
      </View>
    );
  }
}

ExploreScene.propTypes = {
  viewer: PropTypes.object.isRequired, // Passed down by parent.
  handleNavigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
}

export default ExploreScene;