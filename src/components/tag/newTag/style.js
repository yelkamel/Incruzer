'use strict';

import { StyleSheet, Dimensions }  from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth  = Dimensions.get('window').width;

export default StyleSheet.create({
    icon: {
      fontSize: 48,
      color: "#FFF",
    },
    touchableIconClose: {
      width: 35,
      height: 35,
      paddingLeft: 3,
      alignItems: 'center',
      justifyContent: 'center'
    },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textInputContainer: {
  	flexDirection: 'row',
  	justifyContent: 'center',
    alignItems: 'flex-end',
  	height: deviceHeight/10,
  	top: deviceHeight/2.2
  },
  textPlaceholder: {
  	fontSize: 20,
  	fontWeight: 'bold',
  	height: parseInt(deviceHeight/11),
  	textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth,
    borderBottomWidth: 0,
    borderWidth: 0,
    fontFamily: 'HelveticaNeue',
  },
  rightContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20
  },

  circlesContainer: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    marginTop: 30,
  },

  circle: {
    borderColor: '#FFF',
    borderWidth: 1,
    width: 25,
    height: 25,
    margin: 5,
    borderRadius: 13
  },
  checkmarkIconContainer: {
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  checkmarkIcon: {
    color: 'green',
    fontSize: 33,
  },
  headerRotate: {
    backgroundColor: 'transparent',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: deviceHeight/11,
  },
  headerRotateIcon: {
    color: '#FFF',
    fontSize: 35,
  },
  sendTagView:{
      position: 'absolute',
      bottom: 0,
      right: 0,
      justifyContent: 'center',
      height: deviceHeight/7,
      width: deviceWidth/5,
  },
  crossTagView:{
      position: 'absolute',
      top: 0,
      justifyContent: 'center',
      right: 0,
      width: deviceWidth/7,
  },
  footerRotate: {
    backgroundColor: 'red',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: deviceHeight/7,
  },
  tagContent: {
    marginTop: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelTextContent: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareTag: {
    borderRightWidth: 0,
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderBottomColor: '#FFF',
    borderTopColor: '#FFF',
    borderLeftColor: '#FFF',
    marginBottom: 0,
    paddingLeft: 4,
    width: 38,
    height: 34,

  },
  squareTagText: {
    color: '#FFF',
  },
  arrowLeft: {
    width: 24,
    height: 24,
    transform: [{ rotate: '-45deg' }],
    borderStyle: 'solid',
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderRightColor: '#FFF',
    borderBottomColor: '#FFF',
    position: 'relative',
    marginLeft: -12
  },
  cancelText: {
    color: '#FFF',
    fontSize: 20,
  },
  saveTag: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold',
  },
  validationButton : {
	height: 60,
    width: 60,
  }

});
