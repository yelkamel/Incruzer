import React, { Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";

import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';

const { height: deviceHeight, width: deviceWidth} = Dimensions.get("window");

import styles from './style';
import Moments from '../moments';

class MomentsProfile extends React.Component {

  constructor () {
    super()
    this.springValue = new Animated.Value(0.1)
  }

  spring () {
    this.springValue.setValue(0.5)
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1,
        tension: 1
      }
    ).start()
  }

  componentWillMount() {
  
    setTimeout(() => {
      this.spring();
    }, 100);
  }


  render() {
    const user = this.props.user;
    return (
      <Animated.View 
        style={[styles.container, {transform: [{scale: this.springValue}]}]}>
        <View style={{flex: 1, backgroundColor:'white', flexDirection: 'row', width: null}}>
          <Moments isUser={true} />
        </View>
      </Animated.View>
    );
  }
};


export default MomentsProfile;
