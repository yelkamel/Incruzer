'use strict';

import { StyleSheet, Dimensions }  from 'react-native';
import theme from '../../themes/base-theme';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  headerContainer: {
    justifyContent: 	'space-between',
    backgroundColor: 	theme.blue,
    height: 			deviceHeight/10,
    paddingVertical: 	3,
    paddingTop: 		20,
    marginBottom: 		10
  },
  followersHeaderContainer: {
	justifyContent: 	'space-between',
    backgroundColor: 	theme.blue,
    height: 			deviceHeight/6,
    paddingVertical: 	3,
    paddingTop: 		20,
    marginBottom: 		7
  },
  icon: {
    height: 20,
    width: 20,
    marginHorizontal: 10, 
    resizeMode: 'contain',
    tintColor: 'white',
  },
  iconGrey: {
    tintColor: 'grey',
  },
  iconItem: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 		'row',
    justifyContent: 	'space-between',
    alignItems: 		'center',
    paddingHorizontal: 	0,
    width: 				deviceWidth,
    paddingLeft:		10,
    paddingRight: 		10
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 	'center',
    flexDirection: 	'row',
  },
  followersHeader: {
    justifyContent: 'space-between',
    alignItems: 	'center',
    flexDirection: 	'row',
    marginBottom:	5
  },
  userContainer:{
    alignItems: 	'center',
    marginVertical: 0,
    height: 		deviceHeight/8,
    padding: 		0
  },
  userNameContainer: {
    justifyContent: 'space-between',
    alignItems: 	'center',
    flexDirection: 	'column',

  },
  username:{
    color: 			'white',
    textAlign: 		'center',
    fontWeight: 	'bold',
  },
  textContainer: {
    marginTop: 			0,
    flexDirection: 		'column',
    paddingHorizontal: 	20,
    justifyContent: 	'center',
    alignItems: 		'center',
  },
  text: {
    color: 		'black',
    fontWeight: 'bold',
    textAlign: 	'center',
  },
  textLabel: {
    color: 		'grey',
    textAlign: 	'center',
  },
  textInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  userLineRightContent: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  userLineLeftContent: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabItemsContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
