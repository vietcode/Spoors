import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Modal from '.';
import Button from '../Button';

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

class ActionModal extends Component {
  constructor(props) {
    super(props);
    this._toggle = this._toggle.bind(this);

    this.state = {
      visible: false
    }
  }

  _toggle(event) {
    this.setState({visible: !this.state.visible});
  }

  render() {
    const { visible } = this.state;
    const { icon, color, children, ...otherProps } = this.props;

    return (
      <View>
        <Modal
          transparent
          visible={ visible }
          >
          <View style={ styles.container }>
            <View style={ styles.actions }>
              { children }
            </View>

            <View style={ styles.actions }>
              <Button transparent large icon="close" onPress={ this._toggle }></Button>
            </View>
          </View>
        </Modal>

        <Button position="bottomLeft" 
                transparent icon={ icon} 
                large color={ color }
                { ...otherProps }
                onPress={ this._toggle }>
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