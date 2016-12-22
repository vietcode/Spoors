import React, { Component, PropTypes } from 'react';
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
import Profile from './Profile';

class Spoors extends Component {
  constructor(props) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
    this._handleNavigate = this._handleNavigate.bind(this);
  }

  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }
  _renderScene (sceneProps) {
    const { viewer } = this.props;
    const { route } = sceneProps.scene;

    const props = {
      handleNavigate: this._handleNavigate,
      goBack: this._handleBackAction,
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
  viewer: PropTypes.object.isRequired // Passed down by Redux container from GraphQL client.
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'transparent',
    top: undefined
  }
});

export default Spoors;