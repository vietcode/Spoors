import gql from 'graphql-tag';

export const NEAREST_TRIPS_BY_LOCATION = gql`
  query NearestTrips($location: _GeoLocationInput!, $unit: _GeoUnit) {
    viewer {
      getNearestTripsByLocation(location: $loc, maxResults: 30, maxDist: 100, unit: $unit) {
        dist
        node {
          id
          name
          location {
            lat
            lon
          }
        }
      }
    }
  }
`;