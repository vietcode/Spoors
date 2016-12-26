import React, { PureComponent, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import GeoFencing from 'react-native-geo-fencing';

import Map from '../components/Map';
import Annotation from '../components/Map/Annotation';
import Button from '../components/Button';
import Avatar from '../components/Button/Avatar';
import ActionModal from '../components/Modal/ActionModal';
import SearchBar from '../components/SearchBar';

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

class ExploreScene extends PureComponent {
  constructor(props) {
    super(props);
    this._openProfile = this._openProfile.bind(this);
    this._toggleGeolocation = this._toggleGeolocation.bind(this);
    this._action = this._action.bind(this);

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

  _toggleGeolocation(_event) {
    this.props.toggleGeolocation();
  }

  componentDidUpdate(prevProps, prevState) {
    const lastPos = prevProps.viewer.position;
    var newPos = this.props.viewer.position;
    // if (!lastPos && newPos) {
    //   this._map.easeTo({
    //     ...newPos,
    //     zoomLevel: 20
    //   });
    // }
  }

  _action(scene) {
    this.actionModal.toggle();

    this.props.handleNavigate({
      type: 'push',
      route: {
        key: scene.toLowerCase(),
        title: scene
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
    let { viewer, trips, selectedMarker, waypoints, geolocating } = this.props;
    const menu = this._renderMenu();
    let rider = viewer.position? 
        (<Annotation
            id="viewer"
            type="point"
            icon="motorcycle" 
            size={ 30 } 
            coordinates={ [viewer.position.latitude, viewer.position.longitude] } />
        ) : null;

    return(
      <View style={ styles.container }>
        <Map
          mode="follow"
          center={ viewer.position } 
          zoom={ 8 }
        >
          { trips.map(this._renderTrip) }

          { rider }

          { this._renderPOI(selectedMarker) }
        </Map>

        <View style={ styles.footer }>
          <Avatar source={ viewer.user }
            onPress={ this._openProfile } />

          <ActionModal 
              icon="paw" color="#3d8af7" 
              ref={ (modal) => { 
                this.actionModal = modal; 
              } }>
            <Button transparent vertical icon="camera" 
                    onPress={ () => this._action('Camera') }
            >photo</Button>

            <Button transparent vertical icon="create"
            >note</Button>

            <Button transparent vertical icon="mic"
            >audio</Button>
            
            <Button transparent vertical 
                    icon={geolocating? "radio-button-on" : "locate-outline"} 
                    onPress={ this._toggleGeolocation }
            >record</Button>
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
  toggleGeolocation: PropTypes.func.isRequired,
  geolocating: PropTypes.bool,
  goBack: PropTypes.func.isRequired
}

export default ExploreScene;