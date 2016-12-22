import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Map from './Map';
import Annotation from './Map/Annotation';
import Button from './Button';
import Avatar from './Button/Avatar';
import ActionModal from './Modal/ActionModal';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
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
  },
  sightings: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 5,
    height: 30,
    width: 100
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
    this._openSightings = this._openSightings.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);

    this.state = {
      modal: null
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

  _openModal(modal) {
    this.setState({modal: modal});
  }

  _closeModal() {
    this.setState({modal: null});
  }

  _openSightings(_event) {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key: 'sightings',
        title: 'Sightings',
        type: 'modal'
      }
    });
  }

  _renderMenu() {
    return (
      <Button icon="menu" transparent size={ 35 } large vertical>menu</Button>
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

    let {latitude, longitude} = marker.position;

    return (
      <Annotation
              id="poi"
              type="point"
              icon="add-location" 
              coordinates={ [latitude, longitude] }
              title={ marker.formattedAddress }
              active={ active }
              style={ style }
      >
        <View style={ styles.travelModes }>
          { TRAVEL_MODES.map((mode) => 
            <Button key={ mode } icon={ mode } size={ 30 } />
          )}
        </View>
      </Annotation>
    );
  }

  _renderTrip(trip) {
    return trip.routes.map((route) => (
      <Annotation
          id={ route.polyline }
          type="polyline" 
          coordinates={route.polyline}
          strokeWidth={ 4 }
          strokeColor="#4497ff"
        />
    ));
  }

  render() : ReactElement<any> {
    let { viewer, trips, selectedMarker, waypoints } = this.props;
    const menu = this._renderMenu();

    return(
      <View style={ styles.container }>
        <Map 
          center={ viewer.position } 
          zoom={ 8 }
        >
          { trips.map(this._renderTrip) }

          <Annotation
            id="viewer"
            type="point"
            icon="motorcycle" 
            size={ 30 } 
            coordinates={ [viewer.position.latitude, viewer.position.longitude] } />

          { this._renderPOI(selectedMarker) }
        </Map>

        <View style={ styles.footer }>
          <Avatar source={ viewer.user }
            onPress={ this._openProfile } />

          <ActionModal icon="paw" color="#3d8af7">
            <Button transparent vertical icon="camera">photo</Button>
            <Button transparent vertical icon="mic">audio</Button>
            <Button transparent vertical icon="radio-button-on">record</Button>
          </ActionModal>

          <ActionModal style={ styles.sightings }>
            <Text>Sightings</Text>
          </ActionModal>
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