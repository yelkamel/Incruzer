
const React = require('react-native');

const { StyleSheet, } = React;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  messagingHeader: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: '#1ba132',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerText: {
    color: '#b2b2b2',
  },
  inputSearch: {
    backgroundColor: '#e8e8e8',
  },
  momentsList: {
    flex: 6,
    padding: 10,
    flexDirection: 'column',
  },
  momentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  momentLeftContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  momentRightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  momentImageContainer: {
    flex: 1,
  },
  momentImage: {
    width: 70,
    height: 70,
  },
  pinIcon: {
    color: '#1ba132',
  },
  textDistance: {
    color: '#1ba132',
  },
  momentUserName: {
    flex: 3,
    textAlign: 'left',
    paddingLeft: 10,
  },
  usersList: {
    flex: 3,
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#b2b2b2',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  userLeftContainer: {
    flex: 1,
  },
  userRightContainer: {
    flex: 4,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userPicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: 'cover'
  },
  userName: {
    textAlign: 'left',
    paddingLeft: 10,
  },
  userLastMessage: {
    color: '#c2c2c2',
    fontSize: 12,
    textAlign: 'left',
    paddingLeft: 10,
  }
});
