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
import { ApolloProvider } from 'react-apollo';
import codePush from "react-native-code-push";

import reducers from './reducers';
// App container that provides navigation props and viewer data.
import Spoors from './containers/Spoors';

const networkInterface = createNetworkInterface({uri: 'https://phuot.herokuapp.com/api'});

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
  codePushStatusDidChange(status) {
    switch(status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        // console.log("Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // console.log("Downloading package.");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        // console.log("Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        // console.log("Up-to-date.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // console.log("Update installed.");
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    // console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
  }

  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <Spoors />
      </ApolloProvider>
    );
  }
}

let codePushOptions = { 
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
};
export default codePush(codePushOptions)(App);