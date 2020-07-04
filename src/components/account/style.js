
import { StyleSheet, Dimensions }  from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
 
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 15,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: deviceWidth/2,
    height: deviceHeight/3,
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonTouchable: {
    
  },
  button: {
    borderRadius: 5,
    width: deviceWidth - 30,
    paddingVertical: 20,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  connectionButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: "#98d4a1",
  },
  buttonConnectionText: {
    color: '#1ca131',
  },
  registerButton: {
    backgroundColor: '#1ca131',
  },
  icon: {
    fontSize: 23,
    marginRight: 20,
  },
  personIcon: {
    color: "#1ca131",
  },
  facebookIcon: {
    color: "#FFF",
    opacity: 0.7,
  },
  facebookButton: {
    backgroundColor: '#4267b2',
  },
  registerIcon: {
    color: "#FFF",
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  }
});