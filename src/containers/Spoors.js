import { connect } from 'react-redux';

import App from '../components/Spoors';
import { push, pop } from '../actions/navActions';

function mapStateToProps (state) {
  return {
    // `state.navigation` is from the reducer
    navigation: state.navigation,
    // @TODO: Make GraphQL query for viewer's user info.
    viewer: {
      user: {
        name: "Son Tran-Nguyen",
        picture: "http://apriliauae.com/wp-content/uploads/2014/04/vespa-girl.jpg",
        level: 13,
        progress: 0.75
      },
      // @TODO: Retrieve current position of the viewer from GPS.
      position: {
        latitude: 10.321414,
        longitude: 107.082777
      },
      pointOfInterest: state.pointOfInterest
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushRoute: (route) => dispatch(push(route)),
    popRoute: () => dispatch(pop())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);