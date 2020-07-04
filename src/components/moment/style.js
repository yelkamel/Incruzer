'use strict';

import { StyleSheet }  from 'react-native';
import React, { Dimensions }  from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    globaleModale:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
  imageContainer: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: deviceWidth,
    height: deviceHeight,
  },
  imageAbsoluteContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  followModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight,
    width:  deviceWidth,
    opacity: 0.5,
    backgroundColor: 'black',
  },
  followModal: {
    height: parseInt(deviceHeight) * 4/5,
    width:  parseInt(deviceWidth) * 4/5,
    backgroundColor: '#FFF',
    opacity: 1,
  }
});
