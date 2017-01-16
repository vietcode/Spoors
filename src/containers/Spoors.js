import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import App from '../components/Spoors';
import { push, pop } from '../actions/navActions';
import { toggle as toggleGeolocation, geolocate } from '../actions/geolocationActions';

import { VIEWER } from '../queries';

const withViewer = graphql(VIEWER, {
  options: (_) => ({
    variables: {
    }
  }),
  props: ({ data, viewer = {} }) => {
    if (data.loading) {
      return { 
        loading: true, 
        viewer: {
          ...viewer,
          user: null
        }
      };
    }

    if (data.error) {
      console.log(data.error);
      return { 
        viewer: {
          ...viewer,
          user: null
        } 
      };
    }

    return {
      viewer: {
        ...viewer,
        ...data.viewer
      }
    }
  },
});

function mapStateToProps (state, { viewer = {} }) {

  viewer.position = state.map.geolocation;
  viewer.pointOfInterest = state.pointOfInterest;

  return {
    // `state.navigation` is from the reducer
    navigation: state.navigation,
    // Geolocation status is set by reducer, triggered by this container's dispatch.
    geolocating: state.geolocating,
    // @TODO: Make GraphQL query for viewer's user info.
    viewer: {
      ...viewer,
      position: state.map.geolocation,
      pointOfInterest: state.pointOfInterest
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushRoute: (route) => dispatch(push(route)),
    popRoute: () => dispatch(pop()),
    // Dispatch new location update.
    geolocate: (coords, timestamp) => dispatch(geolocate(coords, timestamp)),
    // Dispatch toggling geolocation.
    geolocation: () => dispatch(toggleGeolocation())
  }
}

export default compose(
  withViewer,
  connect(mapStateToProps, mapDispatchToProps)
)(App);