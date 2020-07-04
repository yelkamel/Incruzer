import React, {Component} from 'react';
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
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
import { colors, images, metrics } from '../../themes'

export default class RecordingAnimation extends Component {
  constructor(props) {
    super(props);
    this._twidth = new Animated.Value(0); // Added
    this._rheight = new Animated.Value(0);
    this._bwidth = new Animated.Value(0);
    this._lheight = new Animated.Value(0);
  }

  componentDidMount() {
      const { duration, delay } = this.props;

      var barDuration = duration / 4 - delay /4

      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(
            this._twidth,
        {
          toValue: deviceWidth - 20,
          duration: barDuration
        }),
        Animated.timing(
            this._rheight,
        {
          toValue: deviceHeight -20 ,
          duration: barDuration
        }),
        Animated.timing(
            this._bwidth,
        {
          toValue: deviceWidth -20 ,
          duration: barDuration
        }),
        Animated.timing(
            this._lheight,
        {
          toValue: deviceHeight -20,
          duration: barDuration
        }),
      ]).start();

  }

  render() {
    const topBarStyle = {
      backgroundColor: colors.rouge,
      position: 'absolute',
      top: 10,
      left: 10,
      width: this._twidth,
      height: 5,
    };
    const rightBarStyle = {
      backgroundColor: colors.rouge,
      height: this._rheight,
      position: 'absolute',
      width: 5,
      right: 10,
      top: 10,
    };
    const bottomBarStyle = {
        backgroundColor: colors.rouge,
        width: this._bwidth,
        position: 'absolute',
        height: 5,
        right: 10,
        bottom: 10,
    }
    const leftBarStyle = {
        backgroundColor: colors.rouge,
        height: this._lheight,
        position: 'absolute',
        width: 5,
        left: 10,
        bottom: 10,
    }
    return (
        <View style={{
            flex: 1,
            position: "absolute",
            top:0,
            bottom:0,
            left:0,
            right:0,
            }}>
            <Animated.View
                style={[topBarStyle]} />
            <Animated.View
                style={[rightBarStyle]} />
            <Animated.View
                style={[bottomBarStyle]} />
            <Animated.View
                style={[leftBarStyle]} />
        </View>
    );
  }
}
