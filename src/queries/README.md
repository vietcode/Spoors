## Queries

List of queries used to communicate with a compatible server. For a list of mutations, see [Mutations](../mutations/).

### Nearest Trip

    ```graphql
    query NearestTrips($location: _GeoLocationInput!, $radius: Int!, $unit: _GeoUnit) {
      viewer {
        allTrips(location: $location, radius: $radius, unit: $unit) {
          nodes {
            routes {
              nodes {
                polyline
              }
            }
          }
        }
      }
    }
    ```

This query is used to retrieve a list of trips that are **happening** around the current viewer.

### Search for a direction

    ```graphql
    query Directions() {
      viewer {
        allRoutes(origin: $origin, destination: $destination, mode: $mode) {
          nodes {
            polyline
          }
        }
      }
    }