'use strict';

import React, { Component } from 'react';
import { Image, Dimensions, View, Text, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux";

import { __checkLiveMoment, displayMomentType } from '../../../helpers';

import styles from './style';


class Moment extends Component {
  
  static propTypes = {
    moment: React.PropTypes.object,
    goToMaps: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  dipslayTypeMoment = (date) => {
    if (__checkLiveMoment(date)) {
      return displayMomentType(date) ; 
    }
    return 'Flashback';
  }
  

  render() {
    const { moment:{ image, tags, date, address } } = this.props;
    
    return (
      <View style={styles.container}>
        <View 
          style={styles.imageContainer}
        >
          <Image
            style={styles.image}
            source={{uri: image}}
          />
        </View>
        <View style={styles.rowContainer}>
            <TouchableOpacity
              onPress={()=> this.props.goToMaps(address.location)}
            >
              <Text
                style={[styles.txt]}>
                {address.country}, {address.city}
              </Text>
            </TouchableOpacity>
            <View>
              <Text style={[styles.date]}>
                {this.dipslayTypeMoment(date)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={()=>Actions.momentsProfile()}
            >
              <Text
                style={styles.txt}>{tags.length} tags
              </Text>
            </TouchableOpacity>
        </View>
      </View>  
    );
  }
}



export default Moment;

