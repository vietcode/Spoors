import gql from 'graphql-tag';

export const CREATE_AUTHENTICATION_TOKEN = gql`
  mutation CreateToken($username: String!, $password: String!) {
    createToken(input: {username: $username, password: $password}) {
      token
    }
  }
`;

export const DELETE_AUTHENTICATION_TOKEN = gql`
  mutation DeleteToken {
    deleteToken(input: {timestamp: $timestamp}) {
      viewer {
        user {
          name
        }
      }
    }
  }
`;