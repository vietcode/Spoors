import { connect } from 'react-redux';

import Search from '../components/Search';
import { viewLocation } from '../actions/searchActions';

function mapStateToProps({ geocoder }) {
  return {
    geocoder
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectLocation: (location) => {
      dispatch(viewLocation(location));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);