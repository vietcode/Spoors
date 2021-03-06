import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Modal from '.';
import Button from '../Button';

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

class ActionModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      visible: false
    }
  }

  toggle(event) {
    const { onPress } = this.props;
    let proceed;
    
    if (onPress) { 
      proceed = onPress(event); 
    }

    if (proceed === false) {
      return;
    }
    
    this.setState({visible: !this.state.visible});
  }

  render() {
    const { visible } = this.state;
    const { icon, component, color, children, ...otherProps } = this.props;

    return (
      <View style={ styles.container }>
        <Modal
          transparent
          visible={ visible }
          >
          <View style={ styles.container }>
            <View style={ styles.actions }>
              { children }
            </View>

            <View style={ styles.actions }>
              <Button transparent large icon="close" onPress={ this.toggle }></Button>
            </View>
          </View>
        </Modal>

        <Button transparent icon={ icon} 
                large color={ color }
                { ...otherProps }
                onPress={ this.toggle }>
          { component }
        </Button>
      </View>
    ); 
  }
}

ActionModal.propTypes = {
  visible: PropTypes.bool,
  transparent: PropTypes.bool
}

export default ActionModal;