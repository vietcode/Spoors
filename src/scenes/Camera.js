import React, { PureComponent, Children } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import Button from '../components/Button';
import Camera from 'react-native-camera';

const { Aspect, CaptureTarget, Type, Orientation, FlashMode, CaptureMode} = Camera.constants;

class CameraScene extends PureComponent {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Aspect.fill,
        captureTarget: CaptureTarget.disk,
        type: Type.back,
        orientation: Orientation.auto,
        flashMode: FlashMode[props.flash || 'auto'],
        captureMode: CaptureMode[props.mode === 'video'? props.mode : 'still'] 
      },
      isRecording: false
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    }
  }

  startRecording = () => {
    if (this.camera) {
      this.camera.capture({mode: CaptureMode.video})
          .then((data) => console.log(data))
          .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  switchType = () => {
    let newType;
    const { back, front } = Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashMode() {
    let mode;
    const { auto, on, off } = FlashMode;

    if (this.state.camera.flashMode === auto) {
      mode = 'auto';
    } else if (this.state.camera.flashMode === on) {
      mode = 'on';
    } else if (this.state.camera.flashMode === off) {
      mode = 'off';
    }

    return mode;
  }

  switchCaptureMode = () => {
    let newCaptureMode;
    const { still, video } = CaptureMode;

    if (this.state.camera.captureMode === still) {
      newCaptureMode = video;
    } else if (this.state.camera.captureMode === video) {
      newCaptureMode = still;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        captureMode: newCaptureMode
      },
    });
  }

  get captureModeIcon() {
    let mode;
    const { still, video } = CaptureMode;

    return this.state.camera.captureMode === still? 'videocam' : 'camera';
  }

  render() {
    const { camera, isRecording } = this.state;
    const { aspect, captureTarget, type, flashMode, captureMode } = camera;

    let captureButton;
    if (captureMode === CaptureMode.still) {
      captureButton = <Button 
          large transparent icon="aperture"
          color="white"
          onPress={ this.takePicture } />
    } else if (isRecording) {
      captureButton = <Button 
          large transparent icon="square" rounded
          color="white"
          style={ styles.stopRecordingButton }
          iconStyle={ { lineHeight: 45 }}
          onPress={ this.stopRecording } />
    } else {
      captureButton = <Button 
          large transparent icon="videocam"
          color="white"
          onPress={ this.startRecording } />
    }

    return (
      <View style={ styles.container }>
        <StatusBar
          animated
          hidden
        />
        <Camera            
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={aspect}
          captureTarget={captureTarget}
          type={type}
          flashMode={flashMode}
          captureMode={ captureMode }
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Button transparent icon="arrow-back" onPress={ this.props.goBack } />
          <Button vertical transparent icon="flash"
              onPress={ this.switchFlash }>
            { this.flashMode }
          </Button>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button large transparent icon={ this.captureModeIcon }
              size={ 30 } color="white"
              onPress={ this.switchCaptureMode } />

          { captureButton }

          <Button 
              large transparent icon="reverse-camera" 
              size={ 30 } color="white"
              onPress={ this.switchType } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButton: {
    color: 'white'
  },
  captureModeButton: {
  },
  stopRecordingButton: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    lineHeight: 45
  },
  buttonsSpace: {
    width: 10,
  },
});

export default CameraScene;