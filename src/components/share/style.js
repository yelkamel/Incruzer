
import { StyleSheet, Dimensions }  from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const halfDeviceWidth = deviceWidth*0.5;
const borderRadius = deviceWidth/11;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  validationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: deviceWidth*0.5,
    height: deviceHeight/6,
  },
  socialNetworksContainer: {
    width: deviceWidth,
    padding: 20,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: deviceWidth/11,
  },
  socialNetworkContainer: {
    width: deviceWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  iconSocialNetworkContainer: {
    paddingRight: 10,
  },
});
