import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';

import { APPBAR_HEIGHT, STATUSBAR_HEIGHT } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: STATUSBAR_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
  button: {
  },
  icon: {
    fontSize: 25,
    width: APPBAR_HEIGHT - 10,
    height: APPBAR_HEIGHT - 10
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    borderRadius: 2,
    marginTop: 5,
    marginBottom: 5
  }
})

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.cancel = this.cancel.bind(this);

    this.state = {
      active: false
    }
  }

  open(_event) {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key: 'search',
        title: 'Search'
      }
    });
    this.setState({
      active: true
    });
  }

  cancel(args) {
    this.textInput.setNativeProps({'editable':false});

    this.setState({
      active: false
    }, function() {
      this.textInput.setNativeProps({'editable':true});
    });

    this.props.goBack(args);
  }

  _renderMenu() {
    return (
      <Button icon="menu"
        style={ styles.button } transparent />
    );
  }

  _renderBackButton() {
    return (
      <Button icon="arrow-back"
        style={ styles.button } transparent
        onPress={ this.cancel } />
    );
  }

  render() {
    const props = this.props;
    const {style, children, geocode, route, ...other} = props;

    const leftButton = route.key !== 'explore'? this._renderBackButton() : this._renderMenu();

    return (
      <View style={ [styles.container, style] }>
        { leftButton }
        <TextInput
          ref={(input) => this.textInput = input}
          style={ styles.input }
          returnKeyType="done"
          onFocus={this.open}
          clearButtonMode="while-editing"
          onChangeText={ geocode }
          {...other}
        />
        <Button icon="map"
          style={ styles.button } transparent
        />
      </View>
    )
  }
}

SearchBar.propTypes = {
  geocode: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
  route: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string
  })
}

export default SearchBar;