
const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import theme from '../../../themes/base-theme';

export default StyleSheet.create({
  middleContainer: {
    flex:1,
    width: deviceWidth/5,
    height: null,
    bottom: deviceHeight/5,
    right: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
  },
  middleLeftContainer: {
    flex:1,
    width: deviceWidth/5,
    height: null,
    bottom: deviceHeight/5,
    left: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'absolute',
  },
  footerContainer: {
    flex:1,
    flexDirection: 'row',
    width: null,
    height: null,
    bottom:0,
    left: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    marginHorizontal: deviceWidth/4
  },
  bottomContainer:{
    height: null,
    width: null,
    flex:2,
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: 'red'
  },
  profilUser:{
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  rowContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  camera:{
    flex: 3,
    top: -40,
    left: 0
  },
  buttonCameraContainer:{
    height: deviceHeight/( Platform.OS =="ios" ? 10: 8),
    width: deviceHeight/( Platform.OS =="ios" ? 10: 8),
    borderRadius: deviceHeight/( Platform.OS =="ios" ? 20: 16),
    borderWidth: 5,
    borderColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon:{
    height: deviceWidth/10,
    width: deviceWidth/10,
    resizeMode: 'contain',
  },
  iconLarge:{
    height: deviceWidth/5,
    width: deviceWidth/5,
    resizeMode: 'contain',
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconMixed:{
    height: deviceWidth/7,
    width: deviceWidth/7,
    resizeMode: 'contain',
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconMedium:{
    height: deviceWidth/10,
    width: deviceWidth/10,
    resizeMode: 'contain',
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chatContainer:{
    height: deviceWidth/9,
    width: deviceWidth/9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberContainer:{
    borderRadius: deviceWidth/40,
    height: deviceWidth/20,
    width: deviceWidth/20,
    backgroundColor: theme.orange,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right:0,
    bottom:0,
  },
  number:{
    color: 'white',
    fontSize: 16,
    fontFamily: 'HelveticaNeue',
  },
});
