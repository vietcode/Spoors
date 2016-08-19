/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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
