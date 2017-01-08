import React, { PureComponent, PropTypes } from 'react';
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
    width: 40
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

class SearchBar extends PureComponent {
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

  cancel() {
    this.textInput.setNativeProps({'editable':false});

    this.setState({
      active: false
    }, function() {
      this.textInput.setNativeProps({'editable':true});
    });
  }

  _renderSideButton(button) {
    if (!button) return null;
    const { onPress, ...props } = button.props;

    const thisOnPress = (event) => {
      this.cancel();
      onPress && onPress(event);
    }

    return (
      <button.type {...props} style={ styles.button } onPress={ thisOnPress } />
    );
  }

  render() {
    const props = this.props;
    const {style, children, geocode, leftButton, rightButton, ...other} = props;

    return (
      <View style={ [styles.container, style] }>
        { this._renderSideButton(leftButton) }
        <TextInput
          ref={(input) => this.textInput = input}
          style={ styles.input }
          returnKeyType="done"
          onFocus={ this.open }
          clearButtonMode="while-editing"
          onChangeText={ geocode }
          {...other}
        />
        { this._renderSideButton(rightButton) }
      </View>
    )
  }
}

SearchBar.propTypes = {
  geocode: PropTypes.func.isRequired, // Passed down by Redux container from its dispatch.
}

export default SearchBar;