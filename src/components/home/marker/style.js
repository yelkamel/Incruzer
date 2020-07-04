
const React = require('react-native');

const {StyleSheet, Dimensions} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import theme from '../../../themes/base-theme';

export default StyleSheet.create({
  	zoomContainer: {
		height: 61,
		width: 61,
	},
	container: {
    	height: 61,
		width: 61,
		padding: 3,
		paddingBottom: 10
  	},
  	twoContainer: {
    	height: 63,
		width: 97,
		position: "relative",
		padding: 3
  	},
  	threeContainer: {
    	height: 98,
		width: 98,
		position: "relative",
  	},
    imageContainer:{
      //paddingLeft: 4,
      borderRadius: 28,
      height: 54,
      width: 54,
      resizeMode: 'cover',
      backgroundColor: 'white'
    },
  image: {
    height: 48,
    width: 48,
    resizeMode: 'cover',
    borderRadius: 24,
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'white',
    //marginLeft: 1,
    //marginTop: 5,
  },
  darkOverlay: {
	height: 48,
    width: 48,
    position: 'absolute',
    backgroundColor: "#000",
    opacity: 0.5,
    borderRadius: 24,
  },
  cluster:{
    position: "absolute",
    minHeight: 32,
    minWidth: 32,
    padding: 2,
    borderRadius: 17,
    right: 0,
	marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    borderWidth: 2,
    borderColor: 'white',
  },
  textClustor:{
    fontSize: 16,
    color: 'white',
    fontFamily: 'HelveticaNeue',
    fontWeight: "bold",
  },

  leftTwoImageContainer:{
    borderRadius: 28,
    height: 54,
    width: 54,
    resizeMode: 'cover',
    position: "absolute",
    left: 2,
    top: 4,
    backgroundColor: 'white'

  },
  rightTwoImageContainer:{
    borderRadius: 28,
    height: 54,
    width: 54,
    resizeMode: 'cover',
    position: "absolute",
    right: 2,
    top: 4,
    backgroundColor: 'white'

  },
  leftImageContainer:{
    paddingLeft: 4,
    borderRadius: 28,
    height: 54,
    width: 54,
    //resizeMode: 'cover',
    position: "absolute",
    left: 4,
    top: 36,
    backgroundColor: 'white'

  },
  rightImageContainer:{
    paddingLeft: 4,
    borderRadius: 28,
    height: 54,
    width: 54,
    //resizeMode: 'cover',
    position: "absolute",
    right: 4,
    marginTop: 36,
    backgroundColor: 'white'

  },
  topImageContainer:{
    paddingLeft: 4,
    borderRadius: 28,
    height: 54,
    width: 54,
    //resizeMode: 'cover',
    position: "absolute",
    left: 22,
    top: 4,
    backgroundColor: 'white'
  },
  event: {
	  position: "absolute",
	  height: 36,
	  width: 24,
	  right: 5,
	  top: -4
  },
  unread:{
    backgroundColor: "#D12D12"
  }
});
