import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Map from './Map';
import Marker from './Map/Marker';
import Route from './Map/Route';
import Button from './Button';
import Avatar from './Button/Avatar';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  map: {
    flexDirection:'row'
  },
  header: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  travelModes: {
    flexDirection: 'row'
  }
});

const TRAVEL_MODES = [
  'directions-walk',
  'directions-bike',
  'motorcycle',
  'directions-car',
  'local-taxi',
  'train',
  'flight'
]

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

  _renderMenu() {
    return (
      <Button><Icon name="menu" size={ 20 } /></Button>
    );
  }

  _renderPOI(marker) {
    // if (!marker) return null;

    let style = {}, active = true;

    if (!marker) {
      marker = { position: { latitude: 0, longitude: 0} };
      active = false;
      style.width = 0;
      style.height = 0;
    }

    return (
      <Marker icon="add-location" 
              position={ marker.position }
              title={ marker.formattedAddress }
              active={ active }
              style={ style }
      >
        <View style={ styles.travelModes }>
          { TRAVEL_MODES.map((mode) => 
            <Button key={ mode }><Icon name={ mode } size={ 30 } /></Button>
          )}
        </View>
      </Marker>
    );
  }

  _renderTrip(trip) {
    return trip.routes.map((route) => (
      <Route polyline={route.polyline} draggable={false} 
          strokeWidth={ 2 }
          strokeColor="#4497ff"
        />
    ));
  }

  render() {
    let { viewer, trips, selectedMarker, waypoints } = this.props;
    const menu = this._renderMenu();

    return(
      <View style={ styles.container }>
        <Map 
          center={ viewer.position } 
          zoom={ 4 }
        >
          {trips.map(this._renderTrip)}

          <Marker icon="motorcycle" size={30} position={ viewer.position } />

          { this._renderPOI(selectedMarker) }
        </Map>

        <View style={ styles.footer }>
          <Avatar 
            source={ viewer.user.picture }
            onPress={ this._openProfile } />

          <Button>
            <Text>Navigate</Text>
          </Button>

          { menu }
        </View>
      </View>
    );
  }
}

ExploreScene.propTypes = {
  viewer: PropTypes.object.isRequired, // Passed down by parent.
  trips: PropTypes.array.isRequired,
  waypoints: PropTypes.array.isRequired,
  selectedMarker: PropTypes.object,
  handleNavigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
}

export default ExploreScene;