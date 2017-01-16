import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import Authenticator from '../utils/Authenticator';
import Login from '../scenes/Login';

import { CREATE_AUTHENTICATION_TOKEN } from '../mutations';

const withSubmit = graphql(CREATE_AUTHENTICATION_TOKEN, {
  // Specify the mutate prop to pass to the presentational component.
  props: ({ mutate }) => ({
    submit: (username, password) => mutate({
      variables: { 
        username, 
        password 
      }
    }).then(async (result) => {
      const { data: { createToken: { token } } } = result;
      await (Authenticator.token = token || '');
      return token;
    })
  })
});

export default withSubmit(Login);