
import React, { PropTypes } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
  Platform
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const rayon = deviceWidth/4;

export default class AnimateBorderCircle extends React.Component {
  
  state = {
    marginTop: new Animated.Value(-rayon),
    isRecording: false
  };

  static propTypes = {
    animated: PropTypes.bool.isRequired,
    rayon: PropTypes.number,
    duration: PropTypes.number,
    startRecording: PropTypes.func.isRequired,
    stopRecording: PropTypes.func.isRequired,

  };

  static defaultProps = {
    animated: false,
    rayon,
    duration: 1000,
  };


  startRecording() {
    this.setState({isRecording: true});
    
    this.props.startRecording();
    //this.animate();
  }

  stopRecording() {
    this.setState({isRecording: false});
    this.props.stopRecording();
    
  }

  animate() {
    Animated.timing(this.state.marginTop, {
      duration: this.props.duration + 1,
      toValue: 0
    }).start();
  }

  render(){
    return (
      <View style={style.recordButtonContainer}>
        

        <TouchableOpacity
          style={[
              style.recordButtonContainer,
              {
                borderColor: 'white',
                borderWidth: 14,
                position: 'absolute',
                top: 0,
                zIndex: 2
              }
            ]}
          activeOpacity={1}
          delayLongPress={1000}
          onLongPress={() => this.startRecording()}
          //onPressOut={() => this.stopRecording()}
        >
          
            { this.state.isRecording &&
	            <View style={style.activeRecordButton}>
					<Image
                		source={require('../../../assets/icons/video.gif')}
						style={[style.activeRecordPicture]}
					/>
					<View style={style.centerActiveRecordButton}>
						<TouchableOpacity
				          	style={
				              	style.stopRecordButton
							}
							delayLongPress={1000}
							onLongPress={() => this.stopRecording()}
				        />
					</View>
              	</View>
            }
            
            {  !this.state.isRecording &&
              		<View style={style.inactiveRecordButton}>
					</View>
            }
 
          
        </TouchableOpacity>
        

      </View>
    )
  }
};

const style =  StyleSheet.create({
  recordButtonContainer: {
    overflow: 'hidden',
    width: rayon,
    height: rayon,
    borderRadius: rayon/2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  inactiveRecordButton: {
    backgroundColor: 'white',
    width: rayon - 34,
    height: rayon - 34,
    borderRadius: (rayon - 34 )/2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
  },
  activeRecordButton: {
	  backgroundColor: 'rgba(255, 255,255, 0.4)',
	  width: rayon - 24,
	  height: rayon - 24,
	  borderRadius: (rayon - 24 )/2,
	  alignItems: 'center',
	  justifyContent: 'center',
  },
  activeRecordPicture: {
	  position: 'absolute',
	  top: 0,
	  left: 0,
	  width: rayon - 24,
	  height: rayon - 24,
	  borderRadius: (rayon - 24 )/2,
	  alignItems: 'center',
	  justifyContent: 'center',
	  opacity: 1,
	  zIndex: 10
  },
  centerActiveRecordButton: {
	  backgroundColor: 'white',
	  width: rayon - 54,
	  height: rayon - 54,
	  borderRadius: (rayon - 54 )/2,
	  alignItems: 'center',
	  justifyContent: 'center',
	  position: 'relative',
  },
  stopRecordButton: {
	  backgroundColor: "orange",
	  alignItems: 'center',
	  justifyContent: 'center',
	  padding: 10,
	  borderRadius: 5,
  },
  stopRecording: {
    width: deviceWidth/14,
    height: deviceWidth/14,
    borderRadius: 2,
  }
});
