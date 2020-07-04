
const React = require('react-native');

const {StyleSheet, Dimensions} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import theme from '../../../themes/base-theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor:"transparent"
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor:"transparent"
  },
  animate:{
    height: 70,
    width: 70,
    borderRadius: 35,
    position: 'absolute',
    flexDirection: 'row',
    padding: 10,
    backgroundColor:"transparent"
  },
  animation:{
    color: theme.red,
    fontSize: 15,
  }
});
