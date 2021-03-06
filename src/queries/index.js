import gql from 'graphql-tag';

export const VIEWER = gql`
  query Viewer {
    viewer {
      user {
        name,
        picture,
        level,
        progress
      }
    }
  }
`;

export const NEAREST_TRIPS_BY_LOCATION = gql`
  query NearestTrips($location: _GeoLocationInput!, $radius: Int!, $unit: _GeoUnit) {
    viewer {
      trip {
        routes {
          polyline
        }
        members {
          name,
          picture,
          position
        }
      }
      allTrips(location: $location, radius: $radius, unit: $unit) {
        nodes {
          routes {
            polyline
          }
        }
      }
    }
  }
`;