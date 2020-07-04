'use strict';

import { StyleSheet, Dimensions }  from 'react-native';
import theme from '../../themes/base-theme';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  iconGrey: {
    tintColor: 'grey',
  },
  iconItem: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
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
  iconContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  blockContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  textContainer: {
    backgroundColor:'transparent',
    position: 'absolute',
    justifyContent: 'center',
    top: 10,
    left: (deviceWidth-200)/2
  },
  text: {
    position: 'absolute',
    width: 200,
    textAlign: 'center',
    color: 'white'
  },
//  text: {
//    color: 'white',
//    fontWeight: 'bold',
//    textAlign: 'center',
//  },
  icon: {
    height: 20,
    width: 20,
    marginHorizontal: 10, 
    resizeMode: 'contain',
    tintColor: 'white',
  },
});
