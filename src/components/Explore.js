import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Map from './Map';
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
});

class ExploreScene extends Component {
  constructor(props) {
    super(props);
    this._openSearch = this._openSearch.bind(this);
    this._openProfile = this._openProfile.bind(this);

    this.state = {

    };
  }

  _openSearch(_event) {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key: 'search',
        title: 'Search'
      }
    });
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

  render() {
    let { viewer } = this.props;
    const menu = this._renderMenu();

    return(
      <View style={ styles.container }>
        <Map />

        <View style={ styles.header }>

          <SearchBar
            leftButton={ menu }
            onChangeText={(text) => this.setState({text})}
            onFocus={this._openSearch}
            value={this.state.text}
          />
        </View>

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
  handleNavigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
}

export default ExploreScene;