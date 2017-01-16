import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button
} from 'react-native';

import tcomb from 'tcomb-form-native';
const Form = tcomb.form.Form;

const User = tcomb.struct({
  username: tcomb.String,
  password: tcomb.String,
  rememberMe: tcomb.Boolean
});
const formOptions = {
  // auto: 'placeholders',
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 20
  },
  error: {
    color: 'red'
  },
  content: {
    flex: 1
  },
  image: {
    height: 300
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
});

class LoginScene extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      value: {
      }
    }
  }

  login = () => {
    const { submit, goBack } = this.props;
    const value = this.form.getValue();
    if (value) {
      const { username, password } = value;
      submit(username, password)
      .then((token) => {
        if (token) {
          goBack();
        } else {
          this.setState({
            error: 'Invalid login',
            value: value
          });
        }
      });
    }
  }

  render() {
    const { viewer, goBack } = this.props;
    const { error, value } = this.state;

    return(
      <View style={ styles.container }>
        <Text style={ styles.title }>Sign in</Text>

        {
          error
          &&
          <Text style={ styles.error }>{ error }</Text>
        }
        <Form
          ref={ form => { this.form = form; }}
          type={ User }
          options={ formOptions }
          value={ value }
          style={ styles.content }
        />

        <View style={ styles.toolbar }>
          <Button onPress={ this.login } title="Log me in" accessibilityLabel="Login" />

          <Button 
            onPress={ goBack } 
            title="Maybe later" 
            accessibilityLabel="Cancel and go back to previous scene"
            color="grey" />
        </View>
      </View>
    );
  }
}

LoginScene.propTypes = {
  viewer: PropTypes.object.isRequired, // Passed down by parent.
  handleNavigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired
}

export default LoginScene;