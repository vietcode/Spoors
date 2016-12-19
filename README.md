# Codename: Sp∞rs

A collaborative project to develop a unified mobile app for "Phượt thủ" - the term for travelers (not tourists) in Vietnam. This will be the go-to app in every traveler's pocket that can capture every moments of their trips, while providing features to keep them safe on the road.

[[https://github.com/vietcode/Spoors/blob/master/docs/screenshots/spoors-20161102T180500.gif|alt=Spoors screenshot as of 2016/11/02]]

## Features

- [ ] Display map with all nearby trips and travelers.
- [ ] Interact with other travelers.
- [ ] Create and edit travel plan.
- [ ] Fog of war.
- [ ] Route tracking and guidance.
- [ ] Check in places.
- [ ] Virtual travelers.

## Architecture

In an attempt to miminize effort creating multiple versions for iOS and Android, we will use React Native. It allows us to have a single Javascript code base that can be deployed to both app stores at the same time. Besides, by using Javascript, we can reuse React components for our web app as well.

For backend, we will use Facebook's GraphQL. Instead of writing our server, at first, we will use scaphold.io so we can have a ready-to-use GraphQL server.

For communication, we will use Apollo Client with its `react-apollo` integration to send GraphQL queries and mutations to the server.

For deployment, we will use CodePush so we only have to deploy to app stores once.

## Flow

We will use Redux and its `react-redux` to manage state across components.

Redux has three main components: **actions**, **reducers**, and **store**.

There can only be one and only one **store** in our React app. Our store is created in `src/App.js`, which combines the reducers and middlewares from Apollo.

An **action** can be dispatched through any container component. A **container component** is a higher-order component that uses `react-redux/connect` to map Redux store's state and dispatcher into props for a presentation component. 

In other words, in order for a UI component to dispatch an action, we need to define a **container** inside `src/containers`. The container should use `react-redux/connect` with an object `{mapStateToProps, mapDispatchToProps}` to return a wrapper for the actual UI component.

`mapStateToProps` is an object of `props` to be passed to the UI component, or a function that returns that object. It receives the Redux store's state as its argument.

Similarly, `mapDispatchToProps` is to return extra props that can be used to dispatch actions. It receives a `dispatch` argument, which will take an object action. This object is defined in `src/actions`.

The simplest form of action is `{type}`, which is usually a string defined by a constant stored in `src/constants/ActionTypes.js`. The action object can contain more keys as you see fit. However, we try to follow `https://github.com/acdlite/flux-standard-action`.

However, all of the above is only to provide dispatchers and global state based props to the component. In order to update the global state inside Redux store, we will need reducers in `src/reducers`.

A **reducer** is a function that takes the current state, and the *action*, and returns a new state. **NOTE**: It must returns a state, even if it's the same as the current state.

## BYOB

Bring your own backend.


## Resources

- [Discussion](http://www.phuot.vn/threads/294864-C%C3%B9ng-t%E1%BA%A1o-n%C3%AAn-%E1%BB%A9ng-d%E1%BB%A5ng-Ph%C6%B0%E1%BB%A3t)
- [Trello boards](https://trello.com/spoors)

## Develop

- Follows instructions at https://facebook.github.io/react-native/docs/getting-started.html.
- Clone this repository.
- Run `npm install` to install all dependencies.
- `react-native run-ios` or `react-native run-android`.

## Upgrades

- `react-native upgrade`.
- Choose `y` for all files.
- `react-native link`
- `react-native link react-native-vector-icons`
- Follow instructions at https://github.com/mapbox/react-native-mapbox-gl/blob/master/ios/install.md 

### Notes

`react-native-maps@0.11.0` did not have the patch for old iOS version so it would not run. To remedy it until newer version is released, modify `node_modules/react-native-maps/ios/AirMaps/Callout/SMCalloutView.h` and replace:

```obj-c
@interface SMCalloutView : UIView <CAAnimationDelegate>
```
 
 with

```obj-c
#if __IPHONE_OS_VERSION_MAX_ALLOWED < 100000
@interface SMCalloutView : UIView
#else
@interface SMCalloutView : UIView <CAAnimationDelegate>
#endif
```
