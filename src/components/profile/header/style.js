'use strict';

import { StyleSheet, Dimensions }  from 'react-native';
import theme from '../../../themes/base-theme';
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  header: {
    flex: 1,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor:"white",
    marginBottom: -8
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  textUserSnapshot: {
    color: 			'#000000',
    fontWeight: 	'normal',
    fontSize: 		20,
    fontFamily: 	'HelveticaNeue',
  },

  blokLeft: {
    flex: 			1,
    flexDirection: 	'row',
    justifyContent: 'flex-start',
    alignItems: 	'flex-start',
    paddingTop: 	0
  },

  blockUserInfo: {
    flex: 			1,
    flexDirection: 	'row',
    justifyContent: 'center',
    alignItems: 	'flex-start',
    paddingTop: 	10,
    position: 		'relative',
  },

  blokRight: {
    flex: 			1,
    flexDirection: 	'row',
    justifyContent: 'flex-end',
    alignItems: 	'flex-start',
    paddingTop: 	10
  },

  icon: {
    width: 35,
    height: 7,
    resizeMode: 'contain',
  },

  iconClose: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  text: {
    fontFamily: 	 'HelveticaNeue',
    color: 			 '#FFFFFF',
    backgroundColor: 'transparent'
  },

  textContent: {
    padding: 5
  },

  isfollow: {
    tintColor: theme.blue
  },

  blockUserPicture: {
	  height: 	38,
	  width: 	98,
	  position: 'relative',
	  top: 		-65,
	  left: 	2,
  },

  userProfilePicture:{
    	width: 			98,
    	height: 		98,
    	position: 		'absolute',
    	top: 			0,
    	left: 			0,
    	borderRadius: 	49,
    	backgroundColor:"#FFF",
    	padding: 		4

  },
});
