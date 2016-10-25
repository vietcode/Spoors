import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import Map from '../components/Explore';

import { NEAREST_TRIPS_BY_LOCATION } from '../queries';

const withNearestTrips = graphql(NEAREST_TRIPS_BY_LOCATION, {
  options: ({ login, name }) => ({
    variables: {
      "location": {
        "lat": 10.3214142,
        "lon": 107.0827768
      },
      "unit": "km"
    }
  }),
  props: ({ data }) => {
    if (data.loading) {
      return { loading: true, fetchNextPage: () => {} };
    }

    if (data.error) {
      console.log(data.error);
    }

    const fetchNextPage = () => {
      return data.fetchMore({
        variables: {
          before: _.first(data.repositoryOwner.repository.issues.edges).cursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            repositoryOwner: {
              repository: {
                issues: {
                  // Append new issues to the front of the list, since we're
                  // paginating backwards
                  edges: [
                    ...fetchMoreResult.data.repositoryOwner.repository.issues.edges,
                    ...previousResult.repositoryOwner.repository.issues.edges,
                  ],
                  pageInfo: fetchMoreResult.data.repositoryOwner.repository.issues.pageInfo,
                }
              }
            }
          }
        }
      })
    }

    return {
      // We don't want our UI component to be aware of the special shape of
      // GraphQL connections, so we transform the props into a simple array
      // directly in the container. We also reverse the list since we want to
      // start from the most recent issue and scroll down
      issues: [...data.repositoryOwner.repository.issues.edges.map(({ node }) => node)].reverse(),
      hasNextPage: data.repositoryOwner.repository.issues.pageInfo.hasPreviousPage,
      fetchNextPage,
    };
  },
});

const MapWithData = withNearestTrips(Map);

function mapStateToProps (state) {
  return {
    
   }
}

function mapDispatchToProps (dispatch) {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapWithData);