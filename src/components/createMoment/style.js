
import { StyleSheet, Dimensions }  from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({

  // Explain Text
  explainTextView:{
    position: 'absolute',
    bottom: deviceHeight * 0.02,
    left: deviceWidth * 0.11,
    backgroundColor: 'transparent'
  },
  explainText:{
    fontSize: 14,
    fontFamily: "ContrailOne-Regular"
  },
  explainPictureImage:{
      width: deviceWidth * 0.7,
      height: deviceHeight * 0.12,
      margin: 10,
  },
  explainPicture:{
      alignItems: 'center',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'absolute',
      bottom: 0,
      left: deviceWidth * 0.12,
  },
  container: {
    flex: 1,
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    padding: 5,
    alignItems: 'flex-end'
  },
  bottomOverlay: {
    bottom: deviceHeight/3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cameraButtonContainer:{
    width: deviceWidth/3,
    height: deviceHeight/4.5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  captureButton: {
    backgroundColor: 'white',
    width: deviceWidth/18,
    height: deviceWidth/18,
    borderRadius: deviceWidth/36,
  },
  typeButton: {
    padding: 5,
    marginRight: 35,
    marginTop: 20
  },
  buttonText: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
  },
  optionButton: {
    padding: 5,
    marginLeft: 35,
    marginTop: 20
  },
  icon:{
    height: deviceWidth/10,
    width: deviceWidth/10,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  validateView:{
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  iconValidate:{
	height: deviceWidth/5,
    width: deviceWidth/5,
    resizeMode: 'contain',
    //tintColor: 'white',
  },
  popupPicker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'gray',
    width: deviceWidth*0.5,
    marginHorizontal: deviceWidth*0.25,
    height: deviceHeight*0.3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  authorizedContainer:{
    flex: 1,
    alignItems: 'center',
    padding: 40,
    justifyContent: 'space-between',
  },
  selectMedia: {
    position: 'absolute',
    zIndex: 3,
    top: deviceHeight - deviceHeight/3 - 20,
    left: 0,
    height: deviceHeight/3,
    width: deviceWidth,
    flexDirection: 'column',
    backgroundColor: 'rgb(210, 210, 210)',
  },
  selectMediaItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  selectMediaItemText: {
    fontSize: 18,
    color: 'black',
    backgroundColor: 'transparent',
  }
});
