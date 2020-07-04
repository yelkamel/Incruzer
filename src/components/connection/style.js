
const React = require('react-native');


const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logo: {
    height: deviceWidth/2.5,
    width: deviceWidth/2.5,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    flex: 4,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: deviceWidth/1.5,
    height: 60,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10
  }
});
