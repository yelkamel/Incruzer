'use strict';

import { StyleSheet, Dimensions, Platform }  from 'react-native';
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  text: {
    position: 'absolute'
  },
  slide: {
    flexDirection: 'row',
    flex: 10,
    width: null,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textContainer:{
    height: deviceHeight - (deviceHeight/ (Platform.OS === 'android' ? 6 : 8)),
  },
  footer: {
    height: deviceHeight/ (Platform.OS === 'android' ? 6 : 8),
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    color: "white",
  },
  userContainer:{
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconContainer:{
    flex: 1,
  },
  userPicture: {
    borderColor: 'white',
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: 'cover',
  },
  infoContainer:{
    justifyContent: 'center',
    marginLeft: 10
  },
  userName:{
    fontSize: 20,
    color: "white",
    fontFamily: 'HelveticaNeue',
  },
  textNote: {
    color: '#FFF',
    fontSize: 17,
    opacity: 0.7,
    fontFamily: 'HelveticaNeue',
  },
});
