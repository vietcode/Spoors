import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Map from '../components/Explore';

import { NEAREST_TRIPS_BY_LOCATION } from '../queries';

const withNearestTrips = graphql(NEAREST_TRIPS_BY_LOCATION, {
  options: ({ viewer }) => ({
    variables: {
      "location": {
        "latitude": 10.3214142,
        "longitude": 107.0827768
      },
      "radius": 30,
      "unit": "km"
    }
  }),
  props: ({ data }) => {
    if (data.loading) {
      return { loading: true, trips: [] };
    }

    if (data.error) {
      console.log(data.error);
      return { trips: [] };
    }

    return {
      // We don't want our UI component to be aware of the special shape of
      // GraphQL connections, so we transform the props.
      trips: data.viewer.allTrips.nodes
    };
  },
});

const MapWithData = withNearestTrips(Map);

function mapStateToProps ({ map }) {
  return {
    ...map
  }
}

function mapDispatchToProps (dispatch) {
  return {
    
  }
}

export default compose(
  withNearestTrips,
  connect(mapStateToProps, mapDispatchToProps)
)(Map);