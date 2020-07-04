
const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

import theme from '../../../themes/base-theme';

export default StyleSheet.create({
  headerContainer: {
    flex:0.5,
    flexDirection: 'row',
    width: deviceWidth,
    height: null,
    top:0,
    left: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 20,
  },
  rownumberContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  numberContainer:{
    borderRadius: 10,
    height: 20,
    width: 40,
    marginHorizontal: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  number:{
    color: 'white',
    fontSize: 12,
    fontFamily: 'HelveticaNeue',
    fontWeight: 'bold',
  },
  imageContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    right: 20,
    position: 'absolute',
  },
  image:{
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 30
  },
  searchContainer:{
    justifyContent: 'center',
    marginTop: 12,
    marginHorizontal: 20
  },
  modeContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    width: deviceWidth/3,
    height: deviceWidth/5,
    left: (deviceWidth/2) - (deviceWidth/6),
    position: 'absolute',
    top: 0
  },
  buttonContainer: {
    height: deviceWidth/6,
    width: deviceWidth/6,
    borderRadius: deviceWidth/12,
    backgroundColor: 'transparent',
    position: 'absolute',
    top:0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: deviceWidth/6,
    width: deviceWidth/6,
    borderRadius: deviceWidth/12,
    marginLeft: -2
  },
  right:{
    right: 0
  },
  left:{
    left: 0
  },
  slectedIcon: {
    color: '#cc0058'
  },
  selectedMode: {
    borderColor: theme.red,
    borderWidth: 4,
  },
  txtMode:{
    fontSize: 10,
    color: 'white'
  },
  iconMode:{
    height: deviceWidth/9,
    width: deviceWidth/9,
    resizeMode: 'stretch',
  },
  iconFollowing: {
    height: 30,
    width: 50,
    resizeMode: 'stretch',
  },
  icon:{
    height: deviceWidth/9,
    width: deviceWidth/9,
    resizeMode: 'contain',
    shadowColor:'#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
