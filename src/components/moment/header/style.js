'use strict';

import React, { Platform, StyleSheet, Dimensions }  from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth  = Dimensions.get('window').width;

export default StyleSheet.create({
  header: {
  	height: parseInt(deviceHeight/6),
  	backgroundColor: 'transparent',
  	flexDirection: 'row',
  	padding: 10,
    paddingTop: (Platform.OS === 'ios') ? 20 : 10,
  },
  blokLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  blokCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  blokRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
  	fontSize: 48,
  	color: "#FFF",
  },
  touchableIconClose: {
    width: 35,
    height: 35,
    paddingLeft: 3,
    
  },
  textContent: {
	  flexDirection: 'column',
	  paddingLeft: 10,
	  paddingTop: 5,
  },
  text: {
    color: '#FFF',
  	fontSize: 16,
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
  },
  textNote: {
    color: '#FFF',
  	fontSize: 15,
  	opacity: 1,
    fontFamily: 'HelveticaNeue',
    paddingTop: 0,
    fontWeight: 'bold',
  },
  userPicture: {
    borderColor: '#FFF',
    borderWidth: 1,
    width: 50,
    height: 47,
    borderRadius: 25,
    resizeMode: 'cover',
    padding: 15
  },
  iconPro: {
    marginLeft: 10,
    width: 14,
    height: 14,
    backgroundColor: 'transparent',
    marginTop: 4
  },
  iconBear: {
    marginLeft: 0,
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: -15,
  },
  smallTextIndicator: {
	  color: '#FFF',
	  fontSize: 16,
	  fontFamily: 'HelveticaNeue',
	  position: 'absolute',
	  fontWeight: 'bold',
	  top: 43,
	  left: 35
  }
  
});
