
const React = require('react-native');

const { StyleSheet, } = React;

export default StyleSheet.create({
  container: {
    
  },
  followLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
  },
  followLineRightContent: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  followLineLeftContent: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userPicture: {
    borderColor: '#FFF',
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover'
  },
  userName: {
    color: "#000000"
  },
  addUserIcon: {
    width: 35,
    height: 35,
    color: '#009dda',
  },
  justifyVerticalContent: {
    flex: 1,
   
  },
  addUserIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notPremiumUserPicture: {
    marginLeft: 5,
  }
});
