
import { StyleSheet, Dimensions }  from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  momentTchat: {
    flex: 7,
    flexDirection: 'column',
  },
  userTchat: {
    flex: 3,
    flexDirection: 'column',
  },
  headerTchat: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#39923e',
  },
  headerIconLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerIconLeft: {
    textAlign: 'left',
    fontSize: 40,
    color: '#39923e',
  },
  momentImageContainer: {
    flex: 7,
  },
  userImageContainer: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  momentImage: {
    flex: 1
  },
  userImage: {
    height: deviceWidth/2,
    width: deviceWidth/2,
    borderRadius: deviceWidth/4,
    resizeMode: 'cover',
  },
  momentInfo: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  momentInfoContainer: {
    width: 70,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  pinIcon: {
    color: '#1ba132',
  },
  textDistance: {
    color: '#1ba132',
  },
  nbrMinutes: {
    color: '#e3ac99',
    fontSize: 18,
  },
  min: {
    fontSize: 12,
    color: '#e3ac99',
  },
  giftedChatContainer: {
    flex: 4,
    backgroundColor: '#e8e8e8',
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});  