import { connect } from 'react-redux';

import App from '../components/Spoors';
import { push, pop } from '../actions/navActions';
import { toggle as toggleGeolocation, geolocate } from '../actions/geolocationActions';

function mapStateToProps (state) {
  return {
    // `state.navigation` is from the reducer
    navigation: state.navigation,
    // Geolocation status is set by reducer, triggered by this container's dispatch.
    geolocating: state.geolocating,
    // @TODO: Make GraphQL query for viewer's user info.
    viewer: {
      user: {
        name: "Son Tran-Nguyen",
        picture: "http://apriliauae.com/wp-content/uploads/2014/04/vespa-girl.jpg",
        level: 13,
        progress: 0.75
      },
      position: state.map.geolocation,
      pointOfInterest: state.pointOfInterest
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushRoute: (route) => dispatch(push(route)),
    popRoute: () => dispatch(pop()),
    geolocate: (location) => dispatch(geolocate(location)),
    geolocation: () => dispatch(toggleGeolocation())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);