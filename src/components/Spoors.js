import React, { PureComponent, PropTypes } from 'react';
import {
  BackAndroid,
  NavigationExperimental,
  StyleSheet,
  Platform
} from 'react-native';

const {
  CardStack: NavigationCardStack,
  Header: NavigationHeader,
  PropTypes: NavigationPropTypes
} = NavigationExperimental;
import Drawer from 'react-native-drawer';

import DrawerContent from './Drawer';
import SearchBar from '../containers/SearchBar';
import Explore from '../containers/Map';
import Search from '../containers/Search';
import Profile from '../containers/Profile';
import Camera from '../scenes/Camera';
import Settings from '../scenes/Settings';
import Login from '../containers/Login';

import Button from './Button';

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

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      ({coords, timestamp}) => {
        this.props.geolocate(coords, timestamp);
      },
      (error) => alert(JSON.stringify(error))
    );

    this.geolocator = navigator.geolocation.watchPosition(
      ({coords, timestamp}) => {
      this.props.geolocate(coords, timestamp);
    },
    // https://github.com/facebook/react-native/issues/7495
    {enableHighAccuracy: Platform.OS !== 'android', timeout: 20000, maximumAge: 1000, distanceFilter: 20});

    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
    navigator.geolocation.clearWatch(this.geolocator);
  }

  openDrawer = () => {
    this._drawer.open()
  };

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
      case 'settings':
        return (
          <Settings {...props} />
        );
      case 'login':
        return (
          <Login {...props} />
        );
      default:
        return null;
    }
  }
  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false;
    }
    this.props.popRoute();
    return true;
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
    this.props.geolocation();
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
        leftButton={
          <Button 
            icon={ route.key !== 'explore'? "arrow-back" : "menu" } 
            transparent
            onPress={ route.key !== 'explore'? this._handleBackAction : this.openDrawer }
          />
        }
        rightButton={
          <Button icon="map" transparent />
        }
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
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<DrawerContent handleNavigate={ this._handleNavigate } />}
        styles={ drawerStyles }
        type="overlay"
        tapToClose={ true }
        openDrawerOffset={ 0.2 } // 20% gap on the right side of drawer
        panCloseMask={ 0.2 }
        closedDrawerOffset={ -3 }
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
        <NavigationCardStack
          direction='vertical'
          navigationState={ this.props.navigation }
          renderHeader={ this._renderHeader }
          renderScene={ this._renderScene }
          enableGestures={ true }
          style={{  }}
          cardStyle={ cardStyle }
        />
      </Drawer>
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

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.5, shadowRadius: 3},
  main: {paddingLeft: 3},
}

export default Spoors;