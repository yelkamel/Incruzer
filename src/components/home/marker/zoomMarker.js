import React , { Component, } from 'react';
import { View, TouchableOpacity,TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import styles from './style';
import Animate from './animate';
import ImageMarker from './image';
import _ from 'lodash'

class  MarkerZoom extends Component{

  static propTypes = {
    index: React.PropTypes.number,
    markerInfo: React.PropTypes.object
  }
  constructor() {
    super();
    this.springValue = new Animated.Value(0.01)

  }
  componentDidMount(){

    var randomInt = _.random(4000)

    setTimeout(()=> {
        this.markerEntrance()
    }, randomInt)

  }
  componentWillUnmount() {
//     console.log("MARKER UNMOUNT");
//    this.markerExit()
  }

  componentDidUnount(){
  }

  markerExit = () => {
      Animated.sequence([
          Animated.timing(
                this.springValue,
            {
                toValue: 1.4,
                friction: 1,
                duration: 200
            }
          ),
          Animated.timing(
                this.springValue,
            {
                toValue: 0.01,
                friction: 1,
                duration: 200
            }
          ),
    ]).start();
  }

  markerEntrance = () => {

      Animated.sequence([

          Animated.timing(
                this.springValue,
            {
                toValue: 1.1,
                friction: 1,
                duration: 300
            }
          ),
          Animated.timing(
                this.springValue,
            {
                toValue: 1,
                friction: 1,
                duration: 300
            }
          ),
    ]).start();
  }

  spring = (value) => {

      Animated.sequence([
	  Animated.timing(
      	this.springValue,
	  	{
        	friction: 1,
			tension: 1,
			toValue: 1.1,
			duration: 300
      	}
    ),
    Animated.timing(
      this.springValue,
      {
          friction: 1,
          tension: 1,
          toValue: value,
          duration: 300
      }
  )
    ]).start();

  }

  renderImage(markerInfo, showDarkOverlay){
    return (
      markerInfo.moment.live
      ?
      <Animate moment={markerInfo.moment} markerInfo={markerInfo} showDarkOverlay={showDarkOverlay}/>
      :
      <ImageMarker
          onPress={this.props.onPress} moment={markerInfo.moment} markerInfo={markerInfo} showDarkOverlay={showDarkOverlay}/>
    )
  }

	render(){
    const {markerInfo, index, showDarkOverlay} = this.props;
    return (
      <Animated.View
        style={[
          styles.zoomContainer,
          { transform: [{ scale: this.springValue }] }
        ]}>
        {this.renderImage(markerInfo, showDarkOverlay)}
      </Animated.View>
    )
	}
}

export default MarkerZoom;
