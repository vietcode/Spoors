# Codename: Sp∞rs

A collaborative project to develop a unified mobile app for "Phượt thủ" - the term for travelers (not tourists) in Vietnam. This will be the go-to app in every traveler's pocket that can capture every moments of their trips, while providing features to keep them safe on the road.

## Architecture

In an attempt to miminize effort creating multiple versions for iOS and Android, we will use React Native. It allows us to have a single Javascript code base that can be deployed to both app stores at the same time. Besides, by using Javascript, we can reuse React components for our web app as well.

For backend, we will use Facebook's GraphQL. Instead of writing our server, at first, we will use scaphold.io so we can have a ready-to-use GraphQL server.

For communication, we will use Apollo Client with its `react-apollo` integration to send GraphQL queries and mutations to the server.

For deployment, we will use CodePush so we only have to deploy to app stores once.

## Develop

- Follows instructions at https://facebook.github.io/react-native/docs/getting-started.html.
- Clone this repository.
- Run `npm install` to install all dependencies.
- `react-native run-ios` or `react-native run-android`.