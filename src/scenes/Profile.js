import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Map from '../components/Map';
import Button from '../components/Button';
import Avatar from '../components/Button/Avatar';

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
  padded: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
});

class ProfileScene extends PureComponent {
  constructor(props) {
    super(props);
    this._openProfile = this._openProfile.bind(this);
  }

  _openProfile(_event) {
    this.props.handleNavigate({
      type: 'push',
      route: {
        key: 'profile',
        title: 'Profile'
      }
    });
  }

  logout = () => {
    this.props.goBack();
    this.props.logout();
  }

  render() {
    const { viewer, goBack } = this.props;
    if (!viewer || !viewer.user) {
      return null;
    }

    const leftButton = viewer.user?
      <Button 
        vertical icon="log-out" transparent size={ 40 } large
        onPress={ this.logout }
      >log out</Button> :
      <Button vertical icon="log-in" transparent size={ 40 } large>log in</Button>;

    const image = viewer.user? <Image
            style={ styles.image }
            source={ {uri: viewer.user.picture} } /> : null;

    return(
      <View style={ styles.container }>
        <View style={ styles.content }>
          { image }

          <View style={ [styles.padded, { alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth}] }>
            <Text>{ viewer.user.name }</Text>
            <Text>Level: { viewer.user.level }</Text>
          </View>

          <View style={ styles.padded }>
            <Text>{ viewer.user.name }'s achivements and badges here</Text>
          </View>
        </View>

        <View style={ styles.toolbar }>
          { leftButton }

          <Button vertical icon="close-circle-outline" large
                  transparent size={ 40 }
                  onPress={ goBack }>close</Button>

          <Button vertical icon="person-add" transparent large size={ 40 }>
            register
          </Button>
        </View>
      </View>
    );
  }
}

ProfileScene.propTypes = {
  viewer: PropTypes.object.isRequired, // Passed down by parent.
  handleNavigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
}

export default ProfileScene;