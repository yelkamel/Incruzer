
import React, { PropTypes } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const rayon = deviceWidth/4;

export default class AnimateBorderCircle extends React.Component {
  
  state = {
    offset: new Animated.Value(0),
  };

  static propTypes = {
    animated: PropTypes.bool.isRequired,
    rayon: PropTypes.number,
    duration: PropTypes.number,
  };

  static defaultProps = {
    animated: false,
    rayon,
    duration: 1000,
  };


  componentWillReceiveProps(nextProps) {

    if(nextProps.animated){
      Animated.timing(this.state.offset, {
        duration: this.props.duration + 1,
        toValue: rayon
      }).start();
    }
  }
  render(){
    return (
      <View>
        <View style={[style.capture,{
            width: this.props.rayon,
            height: this.props.rayon,
            borderRadius: this.props.rayon/2,
			shadowColor:'#000',
    		shadowOpacity: 0.2,
    		shadowRadius: 4,
    		shadowOffset: { width: 1, height: 1 },
    		opacity: 0.75
          }]}
        />
        <Animated.View 
          style={[{
            height: this.state.offset,
            width: this.props.rayon,
            bottom: 0,
            position: 'absolute',
            overflow: 'hidden',
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            
          }]}
        >
          <View style={[
              style.capture, 
              {
                width: this.props.rayon,
                height: this.props.rayon,
                borderRadius: this.props.rayon/2,
                borderColor: 'orange',
              }
            ]}
          />
        </Animated.View>
      </View>
    )
  }
};

const style =  StyleSheet.create({
  capture: {
    borderColor: 'white',
    borderWidth: 10,
    backgroundColor: 'transparent',
  },
});
