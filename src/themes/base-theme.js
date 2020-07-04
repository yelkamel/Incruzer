import { Platform, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const iconLoadingDimension = 80;

export default {
  //colors
  red: '#CC0058',
  blue: '#4B9FDB',
  orange: '#F78C37',

  // classes
  container: {
    flex: 1,
  },
  titleWhite: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  textWhiteBold: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'transparent'
  },
  textBlack: {
    color: 'black',
    backgroundColor: 'transparent'
  },
  textBlackBold: {
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'transparent'
  },
  iconClose: {
    width: 20,
    height: 20,
  },
  iconArrowBack:{
    height: 80,
    width: 80,
    resizeMode: 'contain',
  },
  borderAddTags: {
    borderColor: '#fff',
    borderWidth: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTags: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  iconLoading:{
    width: iconLoadingDimension,
    height: iconLoadingDimension,
  },
  loading: {
    width: iconLoadingDimension,
    height: iconLoadingDimension,
    position: 'absolute',
    top: (deviceHeight - iconLoadingDimension)/2,
    left: (deviceWidth - iconLoadingDimension)/2,
  },
  radiusPopup: {
    width: deviceWidth/1.5,
    height: deviceWidth/1.5,
    borderRadius: deviceWidth/3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validation:{
    height: 40,
    width: 40,
  },
  icon:{
    height: 20,
    width: 20,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  iconLogo:{
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
  iconLogoSmall:{
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  fullScreen:{
      position: 'absolute',
      top:0,
      bottom:0,
      left:0,
      right:0
  }
};
