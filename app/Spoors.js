import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { 
  // Container,
  // Header,
  Title,
  Subtitle,
  Content,
  Button, 
  Icon,
  List,
  ListItem,
  Thumbnail,
  InputGroup,
  Input
} from 'native-base';

import Header from './Header';
import Map from './Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

class Spoors extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={ styles.container }>
        <Header viewer={{
          name: 'Phượt thủ ẩn danh',
          level: 0,
          avatar: 'http://www.gravatar.com/avatar/d3e188204cd821ff50d2bcea231c8d93?s=48&d=identicon'
        }}>
        </Header>

        <Content style={styles.container}>
          <List>
            <ListItem>
              <View style={{ alignSelf: 'center', justifyContent: 'flex-start', flexDirection: 'row', marginLeft: -7}}>
                <Input placeholder="I'm going to..." />

                <Button style={{borderRadius: 100}}>
                    <Icon name="md-map" fontSize={30} />
                </Button>
              </View>
            </ListItem>
          </List>

          <Map />
        </Content>
      </View>
    );
  }
}

export default Spoors;