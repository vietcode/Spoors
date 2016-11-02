import { connect } from 'react-redux';

import Search from '../components/Search';

function mapStateToProps({ geocoder }) {
  return {
    geocoder
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);