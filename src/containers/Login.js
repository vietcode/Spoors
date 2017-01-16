import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import Authenticator from '../utils/Authenticator';
import Login from '../scenes/Login';

import { CREATE_AUTHENTICATION_TOKEN } from '../mutations';

const withSubmit = graphql(CREATE_AUTHENTICATION_TOKEN, {
  // Specify the mutate prop to pass to the presentational component.
  props: ({ mutate, client }) => ({
    submit: (username, password) => mutate({
      variables: { 
        username, 
        password 
      },
      refetchQueries: ['Viewer', 'NearestTrips'],
      updateQueries: {
        Viewer: async (prev, { mutationResult }) => {
          const { data: { createToken: { token } } } = mutationResult;
          await (Authenticator.token = token);
          return prev;
        }
      }
    }).then((result) => {
      const { data: { createToken: { token } } } = result;
      return token;
    })
  })
});

export default compose(
  withSubmit
)(Login);