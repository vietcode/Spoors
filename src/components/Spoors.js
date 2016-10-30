import React, { Component, PropTypes } from 'react';
import {
  BackAndroid,
  NavigationExperimental
} from 'react-native';

const {
  CardStack: NavigationCardStack
} = NavigationExperimental;

import Explore from './Explore';
import Search from './Search';
import Profile from './Profile';

class Spoors extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return(
      <NavigationCardStack
        direction='vertical'
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate}
        renderScene={this._renderScene} />
    );
  }
}

Spoors.propTypes = {
  navigation: PropTypes.object.isRequired, // Passed down by Redux container from its state.
  pushRoute: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
  popRoute: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
  viewer: PropTypes.object.isRequired // Passed down by Redux container from GraphQL client.
}

export default Spoors;