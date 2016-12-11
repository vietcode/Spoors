## Mutations

List of mutations used to communicate with a compatible server. For a list of queries, see [Queries](../queries/).

### Add a Stop

  Save a coordinate as a stop in the trip. Returns the route(s) from previous stop to this.

    ```graphql
    mutation AddStop($location: _GeoLocationInput!, $mode: TravelMode!) {
      createStop(location: $location, mode: $mode) {
        routes {

        }
      }
    }
    ```