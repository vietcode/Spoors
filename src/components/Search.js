import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyCn-tBq6mf4YLayRZPfbh2egqV3GHVX9hQ');

import SearchBar from './SearchBar';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  header: {
    marginTop: 20,
    backgroundColor: 'white'
  },
  suggestions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray'
  },
  button: {
    color: 'white',
    backgroundColor: 'orange',
    padding: 10
  },
  list: {
    flex: 1
  },
  listItem: {
    paddingTop: 10,
    paddingBottom: 10
  }
});

class Suggestion extends Component {
  render() {
    const { icon, text } = this.props;

    return (
      <View>
        <Button rounded={true} style={ styles.button }>
          <Icon name={ icon } size={20} />
        </Button>
      </View>
    );
  }
}

class SearchScene extends Component {
  constructor(props) {
    super(props);
    this._geocode = this._geocode.bind(this);
    this._renderLocation = this._renderLocation.bind(this);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.formattedAddress !== r2.formattedAddress
    });

    this.state = {
      dataSource: ds,
      count: 0,
      error: null
    }
  }

  _geocode(address) {
    const component = this;
    const { dataSource } = this.state;

    if (!address) {
      component.setState({
        dataSource: dataSource.cloneWithRows([]),
        count: 0
      });
    };

    Geocoder.geocodeAddress(address).then(res => {
      component.setState({
        count: res.length,
        dataSource: dataSource.cloneWithRows(res)
      });
    })
    .catch(err => {
      component.setState({
        error: err
      })
    });
  }

  _renderBackButton() {
    return (
      <Button onPress={ this.props.goBack }><Icon name="arrow-back" size={ 20 } /></Button>
    );
  }

  /**
   * Returns a list item view for geocoded location
   * @param {Object}  options.position {lat, lng}
   * @param {String}  options.formattedAddress The full address
   * @param {String}  options.feature ex Yosemite Park, Eiffel Tower
   * @param {String?} options.streetNumber
   * @param {String?} options.streetName
   * @param {String?} options.postalCode
   * @param {String?} options.locality city name
   * @param {String}  options.country 
   * @param {String}  options.countryCode
   * @param {String?} options.adminArea
   * @param {String?} options.subAdminArea,
   * @param {String?} options.subLocality
   * @return {Component} React component to render
   */
  _renderLocation({formattedAddress}) {
    return (
      <Button style={ styles.listItem }>
        { formattedAddress }
      </Button>
    )
  }

  render() {
    const { goBack } = this.props;
    let { dataSource, count } = this.state; 

    return (
      <View style={ styles.container }>
        <View style={ styles.header }>

          <SearchBar
            leftButton={ this._renderBackButton() }
            onChangeText={ this._geocode }
            autoFocus={ true }
            clearButtonMode="while-editing"
          />
        </View>

        <View style={ styles.suggestions }>
          <Suggestion icon="restaurant-menu" text="Restaurant" />
          <Suggestion icon="local-gas-station" text="Gas Station" />
          <Suggestion icon="local-atm" text="ATM" />
          <Suggestion icon="expand-more" text="More"/>
        </View>

        <View style={ styles.list }>
          <Text>{count} results</Text>

          <ListView
            dataSource={ dataSource }
            renderRow={ this._renderLocation }
          />
          </View>
      </View>

    ); 
  }
}

SearchScene.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
}

export default SearchScene;