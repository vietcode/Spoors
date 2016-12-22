import React, { PureComponent, PropTypes } from 'react';
import {
  StyleSheet,
  Modal as RNModal,
  Text,
  View,
  ListView
} from 'react-native';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: undefined,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    margin: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    opacity: 0.9
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

class Modal extends PureComponent {
  render() {
    const { visible, transparent, children } = this.props;

    let modalBackgroundStyle = {
      backgroundColor: transparent? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };

    return (
      <RNModal
        animationType={"slide"}
        transparent={ transparent }
        visible={ visible }
        onRequestClose={() => {alert("Modal has been closed.")}}
        >
        <View style={ [styles.backdrop, modalBackgroundStyle] }>
          <View style={ styles.container }>
            { children }
          </View>
        </View>
      </RNModal>

    ); 
  }
}

Modal.propTypes = {
  visible: PropTypes.bool,
  transparent: PropTypes.bool
}

export default Modal;