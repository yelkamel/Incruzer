
import React, { Component } from 'react';
import { 
  Dimensions, 
  Image, 
  View, 
  Alert, 
  Platform,
  StyleSheet,
  Animated,
  PanResponder,
  Text,

} from 'react-native';

import theme from '../../themes/base-theme';
const { width, height } = Dimensions.get('window');

const rayon = (width/1.5);
const IMAGE_SIZE= width/6;


export default class Marker extends Component {
  
  constructor(props) {

    super(props);
     
    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
      left: 0,
      top: 0,
      _previousLeft: 0,
      _previousTop: 0,
      latitude: 0,
      longitude: 0,
    };


    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        //this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        //this.state.pan.setValue({x: 0, y: 0});
        Animated.spring(
          this.state.scale,
          { toValue: 1.1, friction: 3 }
        ).start();
      },
      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
      
    });

  }
  
  _handlePanResponderEnd = (e: Object, gestureState: Object) => {


    this.setState({
      _previousTop: this.state._previousTop + gestureState.dy,
      _previousLeft:  this.state._previousLeft + gestureState.dx,
    })

    this.props.updateAddress({lat: this.state.latitude, lng: this.state.longitude});

    //this.state.pan.flattenOffset();
    Animated.spring(
      this.state.scale,
      { toValue: 1, friction: 3 }
    ).start();

  }

  _handlePanResponderMove = (e: Object, gestureState: Object) => {

    let left = this.state._previousLeft + gestureState.dx;
    let top = this.state._previousTop + gestureState.dy;
    
    if(left < -rayon/2) left = -rayon/2;
    if(top < -rayon/2) top = (-rayon/2);

    if(left > (rayon - IMAGE_SIZE )/2) left = (rayon - IMAGE_SIZE)  /2 ;
    if(top > (rayon - IMAGE_SIZE )/2 ) top = (rayon  - IMAGE_SIZE) /2 ;
    

    this.setLatitudeLongitude(left, top);
    
  }

  setLatitudeLongitude = (left: number, top: number) => {

    const longitude  =  
      ( ( left / rayon ) * this.props.region.longitudeDelta ) 
      + this.props.region.longitude;
    const latitude = (
      ( top / rayon ) * this.props.region.latitudeDelta )
      + this.props.region.latitude;
 
    this.setState({latitude, longitude, top, left});
     
  }

  renderMarkersUser(){

    // Destructure the value of pan from the state
    const { scale } = this.state;

    const rotate = '0deg';
    
    const imageStyle = {transform: [{rotate}, {scale}]};


    return (
      <Animated.View
        style={[
          imageStyle,
          {
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            left: this.state.left,
            top: this.state.top,
          }
        ]} 
        {...this._panResponder.panHandlers}
      >
        <Image 
          source={require('../../../assets/logos/logo.png')}
          style={styles.logo}
        />
        <View 
          style={styles.point}
        >
        </View>
      </Animated.View>
    );
  }


  render() {
    return (
      <View style={[
          theme.radiusPopup,
          styles.markerContainer
        ]}
      >
        {this.renderMarkersUser()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  markerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  point: {
    backgroundColor: '#401a05',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  logo: {
    resizeMode: 'contain',
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  }
})


