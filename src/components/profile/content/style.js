'use strict';

import { StyleSheet, Dimensions }  from 'react-native';
import theme from '../../../themes/base-theme';

const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create(
{
  content: {
    flexDirection: 'column',
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    
  },
  row:{
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: deviceHeight/30,
  },
  textContent: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  name: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'HelveticaNeue',
    marginVertical: 5,
    paddingTop: 0,
    fontWeight: 'bold',
  },
  textUserSnapshot: {
	color: '#000',
    fontSize: 15,
    fontFamily: 'HelveticaNeue',
    marginVertical: 5,
    paddingTop: 0,
    fontWeight: 'bold',
  },
  snapshot: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  number:{
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  website: {
    color: theme.blue,
    fontWeight: 'bold',
    fontSize: 15,
  },
  description: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: deviceHeight/30,
    marginBottom: 10,
    textAlign: 'center',
    marginHorizontal: 10
  },
  buttonFollow: {
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 20,
    flex: 4,
    width: null,
    height: null,
    flexDirection: 'row',
    margin: 8,
    padding: 8,
    justifyContent: 'space-between',
  },
  textFollow:{
    color: 'blue'
  },
  iconContainer:{
    flex: 1,
    justifyContent: 'center'
  },
  userIcon:{
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  icon:{
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  iconPro: {
    marginLeft: 10,
    width: 22,
    height: 22,
    backgroundColor: 'transparent',
  },
  
  userStatsContainer: {
	  paddingHorizontal: 20,
	  flexDirection: 'row',
	  flex: 2,
	  paddingBottom: 2,
  },
  userStatsItem: {
  	  flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  userStatsCount: {
      backgroundColor: 'transparent',
      color: '#000',
      fontWeight: 'bold',
      fontSize: 15,
      fontFamily: 'HelveticaNeue',
  },
  userStatsLabel: {
  	  backgroundColor: 'transparent',
      color: 'gray',
      fontWeight: 'normal',
      fontSize: 15,
      fontFamily: 'HelveticaNeue',
  }
});
