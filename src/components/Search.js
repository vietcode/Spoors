import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SearchBar from './SearchBar';
import Button from './Button';

import { APPBAR_HEIGHT, STATUSBAR_HEIGHT } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: APPBAR_HEIGHT + STATUSBAR_HEIGHT
  },
  card: {
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    marginBottom: 16,
  },
  suggestions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
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

class Suggestion extends PureComponent {
  render() {
    const { icon, text } = this.props;

    return (
      <View>
        <Button info rounded icon={ icon }>
        </Button>
      </View>
    );
  }
}

class SearchScene extends PureComponent {
  constructor(props) {
    super(props);
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

  _addLocation(location) {
    const { selectLocation, goBack } = this.props;
    selectLocation(location);
    goBack();
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
  _renderLocation(location) {
    const onPress = () => this._addLocation(location);
    return (
      <Button style={ styles.listItem } onPress={ onPress }>
        { location.formattedAddress }
      </Button>
    )
  }

  render() {
    const { geocoder } = this.props;
    let { dataSource, count } = this.state;
    const { places } = geocoder;

    return (
      <View style={ styles.container }>
        <View style={ [styles.card, styles.suggestions] }>
          <Suggestion icon="restaurant" text="Restaurant" />
          <Suggestion icon="local-gas-station" text="Gas Station" />
          <Suggestion icon="local-atm" text="ATM" />
          <Suggestion icon="expand-more" text="More"/>
        </View>

        <View style={ [styles.card, styles.list] }>
          <Text>{places.length} results</Text>

          <ListView
            enableEmptySections={ true }
            dataSource={ dataSource.cloneWithRows(places) }
            renderRow={ this._renderLocation }
          />
          </View>
      </View>

    ); 
  }
}

SearchScene.propTypes = {
  handleNavigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  geocoder: PropTypes.object.isRequired,
  selectLocation: PropTypes.func.isRequired
}

export default SearchScene;