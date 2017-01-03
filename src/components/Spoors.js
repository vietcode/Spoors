import React, { PureComponent, PropTypes } from 'react';
import {
  BackAndroid,
  NavigationExperimental,
  StyleSheet
} from 'react-native';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes
} = NavigationExperimental;

import SearchBar from '../containers/SearchBar';
import Explore from '../containers/Map';
import Search from '../containers/Search';
import Profile from '../scenes/Profile';
import Camera from '../scenes/Camera';

// import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

class Spoors extends PureComponent {
  constructor(props) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
    this._handleNavigate = this._handleNavigate.bind(this);
    this._toggleGeolocation = this._toggleGeolocation.bind(this);
  }

  componentWillMount() {
    /*
    
    BackgroundGeolocation.configure({
      // Desired accuracy in meters. Possible values [0,10,100,1000].
      // The lower the number, the more power devoted to GeoLocation 
      // resulting in higher accuracy readings.
      desiredAccuracy: 0,
      // Stationary radius in meters. When stopped, the minimum 
      // distance the device must move beyond the stationary location
      // for aggressive background-tracking to engage.
      stationaryRadius: 1,
      // The minimum distance (measured in meters) a device must move 
      // horizontally before an update event is generated
      distanceFilter: 0,
      // When enabled, the plugin will emit sounds for life-cycle 
      // events of background-geolocation!
      // debug: true,
      startOnBoot: true,
      // Enable this in order to force a stop() when the application 
      // terminated (e.g. on iOS, double-tap home button, swipe away 
      // the app).
      stopOnTerminate: true,
      // The minimum milliseconds interval between location updates.
      interval: 5000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      // Custom notification title in Android drawer.
      notificationTitle: 'Recording spoors',
      // Custom notification text in Android drawer.
      notificationText: 'Text later.',
      // Server url where to send HTTP POST with recorded locations.
      // url: 'https://phuot.herokuapp.com/location',
      // Server url where to send fail to post locations
      // syncUrl: 'https://phuot.herokuapp.com/location',
      // Specifies how many previously failed locations will be sent 
      // to server at once.
      syncThreshold: 100,
      // Limit maximum number of locations stored into db.
      maxLocations: 10000,
      httpHeaders: {
        'X-App': 'spoors'
      },
      // Switch to less accurate significant changes and region 
      // monitory when in background.
      saveBatteryOnBackground: false
    }, function () { });

    BackgroundGeolocation.on('location', (location) => {
      this.props.geolocate(location);
    });

    BackgroundGeolocation.on('error', (error) => {
      alert('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      //handle stationary locations here
    });

    BackgroundGeolocation.start(() => {
      this.props.geolocation();
    });

    */
    
    navigator.geolocation.getCurrentPosition(
      ({coords, timestamp}) => {
        this.props.geolocate(coords, timestamp);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.geolocator = navigator.geolocation.watchPosition(
      ({coords, timestamp}) => {
      this.props.geolocate(coords, timestamp);
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 20});
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
    navigator.geolocation.clearWatch(this.geolocator);
  }
  _renderScene (sceneProps) {
    const { viewer } = this.props;
    const { route } = sceneProps.scene;

    const props = {
      handleNavigate: this._handleNavigate,
      goBack: this._handleBackAction,
      toggleGeolocation: this._toggleGeolocation,
      viewer: viewer,
      ...sceneProps
    }

    switch (route.key) {
      case 'explore':
        return (
          <Explore {...props} />
        );
      case 'search':
        return (
          <Search {...props} />
        )
      case 'profile':
        return (
          <Profile {...props} />
        );
      case 'camera':
        return (
          <Camera {...props} />
        );
      default:
        return null;
    }
  }
  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false
    }
    this.props.popRoute();
    return true
  }
  _handleNavigate (action) {
    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route);
        return true
      case 'back':
      case 'pop':
        return this._handleBackAction();
      default:
        return false
    }
  }

  _toggleGeolocation() {
    const geolocating = !this.props.geolocating;

    if (geolocating) {
      BackgroundGeolocation.start(() => {
        this.props.geolocation();
      });
    } else {
      BackgroundGeolocation.stop(() => {
        this.props.geolocation();
      });
    }
  }

  _renderHeader(sceneProps) {
    const { route } = sceneProps.scene;

    const props = {
      handleNavigate: this._handleNavigate,
      goBack: this._handleBackAction
    }

    // We only want to have the search header on the map and search scenes.
    if (route.key != 'explore' && route.key != 'search') {
      return null;
    }

    return (
      <SearchBar
        placeholder="Try places, restaurants, hotels..."
        route={ route }
        {...props} 
      />
    );
  }

  render() : ReactElement<any> {
    const { navigation } = this.props;
    const route = navigation.routes[navigation.index];

    let cardStyle = {
      backgroundColor: 'transparent'
    };

    // @TODO: Change direction based on scene.
    return (
      <NavigationCardStack
        direction='vertical'
        navigationState={ this.props.navigation }
        renderHeader={ this._renderHeader }
        renderScene={ this._renderScene }
        enableGestures={ true }
        style={{  }}
        cardStyle={ cardStyle }
      />
    );
  }
}

Spoors.propTypes = {
  navigation: PropTypes.object.isRequired, // Passed down by Redux container from its state.
  pushRoute: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
  popRoute: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
  geolocate: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
  geolocation: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
  viewer: PropTypes.object.isRequired // Passed down by Redux container from GraphQL client.
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
    top: undefined
  }
});

export default Spoors;