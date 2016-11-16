/**
 * The root component that wraps the main app component with all 
 * data-related components such as `ApolloProvider`.
 * This component works on all platforms.
 * @flow
 */

import React, { Component } from 'react';
import {
} from 'react-native';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import ApolloProvider from 'react-apollo/ApolloProvider';

import reducers from './reducers';
// App container that provides navigation props and viewer data.
import Spoors from './containers/Spoors';

const networkInterface = createNetworkInterface({uri: '/api'});

const client = new ApolloClient({
  networkInterface,
  // Apollo transformer to automatically add `__typename` to all queries.
  queryTransformer: addTypename,
  // Normalize ID for different object types for Apollo caching.
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  }
});

// We use our own Redux store, so we combine Apollo with it.
const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    ...reducers
  }),
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  )
);

class App extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <Spoors />
      </ApolloProvider>
    );
  }
}

export default App;