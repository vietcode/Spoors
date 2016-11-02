import { connect } from 'react-redux';

import SearchBar from '../components/SearchBar';
import { geocoding, geocoded, failedGeocoding } from '../actions/searchActions';

import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyCn-tBq6mf4YLayRZPfbh2egqV3GHVX9hQ');

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    geocode: (address) => {
      if (!address) {
        return dispatch(geocoded(address, []));
      }

      Geocoder.geocodeAddress(address).then(res => {
        // res is an Array of geocoding object
        dispatch(geocoded(address, res));
      })
      .catch(err => dispatch(failedGeocoding(err)));

      // Start to dispatch an action for GEOCODING immediately.
      dispatch(geocoding(address));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);