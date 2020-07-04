import React from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
  Platform,
  Animated
} from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from "react-native-router-flux";
import Sound from 'react-native-sound'
import Validation from './validation'
import * as Animatable from 'react-native-animatable';
import RecordingAnimation from '../common/RecordingAnimation'
import styles from './style.js';
import { colors, images, metrics } from '../../themes'
import  MediaPicker from './mediaPicker'

const { height: deviceHeight} = Dimensions.get("window");

const DURATION = 7000;
const EXPLAIN_DURATION = 8000;
const DOUBLE_TAP= (Platform.OS === 'ios') ? 500 : 600



export default class CameraApp extends React.Component {

  constructor(props) {
    super(props);

    this.camera = null
    this.explainPicture= null
    this.state = {
      hasFirstTouch: false,
      camera: {
        aspect: 		Camera.constants.Aspect.fill,
        captureTarget: 	Camera.constants.CaptureTarget.temp,
        type: 			Camera.constants.Type.back,
        orientation: 	Camera.constants.Orientation.auto,
        flashMode: 		Camera.constants.FlashMode.off,
        captureQuality: Camera.constants.CaptureQuality.medium,
      },
      isRecording: 	false,
      capture: 		false,
      isSwitching:	false,
      response: null,
      isShutdown: false,
    };
  }

  componentWillMount(){
    this.setState({capture: false, isSwitching: false})
  }

  componentDidMount(){
      this.startExplainAnimation()
  }

  componentWillUnmount(){
    this.camera = null;
    this.setState({
        isShutdown: true,
    })
  }

  startExplainAnimation(){
    var animationInterval = setInterval(() => {
        if (this.refs.explainAnimation != null)
            this.refs.explainAnimation.bounce(1000)
    }, 2000)
    setTimeout(() => {
        clearInterval(animationInterval)
        if (this.refs.explainAnimation != null)
            this.refs.explainAnimation.fadeOutDown(1000)
    }, EXPLAIN_DURATION)
  }


  cancelValidation = () => {
      this.setState({
          isValidation: false,
          hasFirstTouch: false,
          isRecording: 	false,
          isSwitching:	false,
          response: null,
      })
  }


  tapScreen = () => {

      if (this.state.isRecording){
        this.stopRecording()
     }
     else {
          if (!this.state.hasFirstTouch) {
              this.setState({
                  hasFirstTouch: true
              })
          } else {
              this.setState({
                  hasFirstTouch: false
              })
              this.takePicture()
          }

          setTimeout(() => {
              if (this.state.hasFirstTouch){
                this.setState({
                  hasFirstTouch: false
                })
                this.startRecording()
              }
          }, DOUBLE_TAP)
     }
  }

  gotoValidation = ( response ) => {
    this.setState({
        isSwitching : true,
        response: response,
        isValidation: true
    });
  }

  takePicture = () => {

    if (this.camera && !this.state.isRecording && !this.state.isSwitching)
    {
		this.camera.capture({})
        	.then((data) => {
				console.log('data.path', data);
				const response = {
					uri: Platform.OS === 'ios' ? data.path.replace('file://', '') : data.path,
					type: 'image',
          		};

          		this.gotoValidation( response );
	        })
	        .catch(err => console.error(err));
    }
    else if(this.state.isRecording)
    {
      this.setState({ isRecording: false });
    }
  };

  playSound(file) {
     var clirr = new Sound(file, Sound.MAIN_BUNDLE, (success) => {
      //clirr.setVolume(0.05)
      clirr.play()
      clirr.setNumberOfLoops(-1);
    }, (error) => alert(error))
  }

  startRecording = () => {

    if (this.camera && !this.state.isRecording  && !this.state.isSwitching) {
      this.playSound('../../../assets/audio/play.mp3');
      this.setState({
        isRecording: true
      });
          this.camera.capture({
          mode: Camera.constants.CaptureMode.video})
        .then((data) => {
          const response = {uri: data.path, type: 'video'};

          this.playSound('../../../assets/audio/stop.mp3');
          this.gotoValidation( response );
        })
        .catch(err => console.error(err));

        setTimeout(() => { this.stopRecording(); }, DURATION);
    }
  };



  stopRecording = () => {
    this.setState({
        isRecording: false,
    })
    if (this.camera) {
      this.camera.stopCapture();
    }
  };

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back)
    {
    	newType = front;
    }
    else if (this.state.camera.type === front)
    {
    	newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  };

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === on)
    {
    	newFlashMode = off;
    }
    else if (this.state.camera.flashMode === off)
    {
    	newFlashMode = on;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  };

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === on) {
      icon = images.flash;
    } else if (this.state.camera.flashMode === off) {
      icon = images.flashOff;
    }

    return icon;
  }

  onZoomChanged = (event: Event) => {
    if (!this.camera.onZoomChanged) { return; }
    this.camera.onZoomChanged(event.nativeEvent);
  }

  renderPicker(){
        return(
          <View style={[styles.pickerContainer]}>
            <TouchableOpacity
              style={[styles.typeButton]}
              onPress={ () => {
                   this.selectMedia();
                }
              }
            >
              <Image
                source={ require('../../../assets/icons/biblio.png') }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        );
  }

  renderArrow(){
      return (<View
        style={[styles.overlay,styles.topOverlay]}>
        <MediaPicker gotoValidation={this.gotoValidation}/>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => Actions.pop()}
        >
          <Image
            source={images.arrowBottom}
            style={[styles.icon, {
              height: 27,
              width: 27,
            }]}
          />
        </TouchableOpacity>
      </View>)
  }

  renderTakePicture(){
      return(<View style={styles.cameraButtonContainer}>
          <RecordView
              startRecording={this.startRecording}
              stopRecording={this.stopRecording}
              duration={DURATION}
          />
          <View>
              <TouchableOpacity
                  activeOpacity={1}
                  onPress={this.takePicture}
              >
              <View style={styles.captureButton}/>
              </TouchableOpacity>
          </View>
      </View>)
  }

  renderFlash(){
      return (<View
          style={styles.optionButton}>
          <TouchableOpacity onPress={this.switchFlash}>
              <Image
                  source={this.flashIcon}
                  style={styles.icon}
              />
          </TouchableOpacity>
      </View>)
  }

renderReverse(){
  return (<View style={[styles.optionButton]}>
      <TouchableOpacity onPress={this.switchType}>
          <Image
              source={images.reverseIcon}
              style={styles.icon}
          />
      </TouchableOpacity>
  </View>)
  }

  renderExplainPicture(){
      return (<Animatable.View
          ref={(explainPicture) => { this.explainPicture = explainPicture}}
          style={styles.explainPicture}>
          <Image
              source={images.priseVideo}
              style={styles.explainPictureImage}
          >
          <View style={styles.explainTextView}>
              <Text style={styles.explainText}>
                  Tap the screen to take a cruize
            </Text>
          </View>

        </Image>
      </Animatable.View>)
  }


  renderRecordAnimation(){
      return (<RecordingAnimation  delay={500}/>)
  }

  renderCamera(){
      return (
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={[styles.preview]}
            aspect={this.state.camera.aspect}
            captureTarget={this.state.camera.captureTarget}
            type={this.state.camera.type}
            captureAudio={true}
            flashMode={this.state.camera.flashMode}
            captureQuality={this.state.camera.captureQuality}
            defaultTouchToFocus
            mirrorImage={false}
          >
          {this.state.isRecording &&
              <RecordingAnimation
                  duration={DURATION}
                  delay={1000}/>
          }
          </Camera>
      )
  }

  render() {
    if( typeof this.props.isSwitching !== "undefined" )
    {
	    this.state.isSwitching = false;
    }

    if (this.state.isShutdown)
        return (<View> </View>)

    if (this.state.isValidation)
        return (<View style={{flex:1,backgroundColor : 'white'}}>
            <Validation
                coordinateUser={this.props.coordinateUser}
                cancelValidation={this.cancelValidation}
                response={this.state.response}/>
        </View>)

    return (
    <TouchableWithoutFeedback onPress={this.tapScreen}>
        <View
          style={[styles.container]}>
      	{ !this.state.isValidation &&
	        this.renderCamera()
        }


        {(!this.state.isValidation && !this.state.isRecording ) &&
         this.renderArrow()
        }

        <View style={[styles.overlay, styles.bottomOverlay]}>
        	{(!this.state.isValidation && !this.state.isRecording ) &&
                this.renderFlash()
            }
            {(!this.state.isValidation && !this.state.isRecording )  &&
                this.renderReverse()
            }

        </View>
        {(!this.state.isValidation && !this.state.isRecording )  &&
            this.renderExplainPicture()
        }

        </View>
      </TouchableWithoutFeedback>
    );
  }
};
