import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import { List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#F5FCFF',
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

class SettingsScene extends PureComponent {

  render() {
    const { viewer, goBack } = this.props;

    return(
      <View style={ styles.container }>
        <List>
          <ListItem>
            <InputGroup>
              <Input inlineLabel label="Server" placeholder="http://www.example.com/api" />
            </InputGroup>
          </ListItem>
        </List>

        <View style={ styles.toolbar }>
          <Button vertical icon="close-circle" large
                  transparent size={ 40 }
                  onPress={ goBack }>close</Button>
        </View>
      </View>
    );
  }
}

SettingsScene.propTypes = {
  viewer: PropTypes.object.isRequired, // Passed down by parent.
  handleNavigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
}

export default SettingsScene;