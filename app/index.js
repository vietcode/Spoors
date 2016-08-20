/**
 * The root component that wraps the main app component with all 
 * data-related components such as `ApolloProvider`.
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import ApolloProvider from 'react-apollo/ApolloProvider';

const networkInterface = createNetworkInterface('/api');

const client = new ApolloClient({
  networkInterface
});

import Spoors from './Spoors';

class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Spoors />
      </ApolloProvider>
    );
  }
}

export default Root;
