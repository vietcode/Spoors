import { connect } from 'react-redux';
import { withApollo, graphql, compose } from 'react-apollo';

import Authenticator from '../utils/Authenticator';
import Profile from '../scenes/Profile';

import { DELETE_AUTHENTICATION_TOKEN } from '../mutations';

const withLogout = graphql(DELETE_AUTHENTICATION_TOKEN, {
  // Specify the mutate prop to pass to the presentational component.
  props: ({ mutate, ownProps }) => ({
    logout: async () => {
      await (Authenticator.token = '');
      return mutate({
        variables: {
          timestamp: Date.now()
        },
        refetchQueries: ['Viewer', 'NearestTrips']
      });
    }
  })
});

export default compose(
  withLogout
)(Profile);