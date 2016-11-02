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
    height: APPBAR_HEIGHT,
    marginTop: STATUSBAR_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15,
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
      <Button style={ styles.button }>
        <Icon name="menu" style={ styles.icon }/>
      </Button>
    );
  }

  _renderBackButton() {
    return (
      <Button onPress={ this.cancel } style={ styles.button }>
        <Icon name="navigate-before" style={ styles.icon } />
      </Button>
    );
  }

  render() {
    const { active } = this.state;
    const props = this.props;
    const {style, children, geocode, ...other} = props;

    const leftButton = active? this._renderBackButton() : this._renderMenu();

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
        <Button style={ styles.button }>
          <Icon name="map" style={ styles.icon } />
        </Button>
      </View>
    )
  }
}

SearchBar.propTypes = {
  geocode: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
}

export default SearchBar;