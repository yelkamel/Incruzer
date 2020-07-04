
import React, { PropTypes } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';


import Background from '../common/background';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const rayon = deviceWidth/4;

export default class AnimateBorderCircle extends React.Component {
  
  state = {
    height: new Animated.Value(0),
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
    this.animate();
  }

  stopRecording() {
    this.setState({isRecording: false});
    this.props.stopRecording();
    
    Animated.timing(this.state.height, {
      duration: 10,
      toValue: 0
    }).start();

  }

  animate() {
    Animated.timing(this.state.height, {
      duration: this.props.duration + 1,
      toValue: rayon
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
                borderWidth: 10,
              }
            ]}
          activeOpacity={1}
          delayLongPress={1000}
          onLongPress={() => this.startRecording()}
          //onPressOut={() => this.stopRecording()}
        >
          
          <View style={style.recordButton}>
            {
              this.state.isRecording && 
              <TouchableOpacity 
                style={style.stopRecording}
                onPress={() => this.stopRecording()}
              >
                <Background style={style.stopRecording} />
              </TouchableOpacity>            
            }
          </View>
          
        </TouchableOpacity>

        <Animated.View 
          style={[{
            width: rayon,
            height: this.state.height,
            left: 0,
            top: 0,
            position: 'absolute',
            overflow: 'hidden',
            justifyContent: 'flex-start',
            borderRadius: (rayon/2),

          }]}
        >
          <Background style={{
              width: rayon,
              height: rayon,
              overflow: 'hidden',
              borderRadius: (rayon/2),
            }} 
          />
        </Animated.View>
        

      </View>
    )
  }
};

const style =  StyleSheet.create({
  recordButtonContainer: {
    backgroundColor: 'transparent',
    width: rayon,
    height: rayon,
    borderRadius: rayon/2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  recordButton: {
    backgroundColor: 'white',
    width: rayon - 24,
    height: rayon - 24,
    borderRadius: (rayon - 24 )/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopRecording: {
    width: deviceWidth/14,
    height: deviceWidth/14,
    borderRadius: 2,
  }
});
