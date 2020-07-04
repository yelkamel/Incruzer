'use strict';

import { StyleSheet, Dimensions }  from 'react-native';

const { width: deviceWidth, height: deviceHeight} = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
    backgroundColor:"transparent",
    flex: 1,
    flexDirection: 'column',
	padding: 30
  },
  modalContainer: {
    flex: 1,
    padding: 13,
    borderRadius: 20,
    height: deviceHeight/2.2
  },
  content: {
    flex: 3,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -20
  },
  overlay: {
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0,
  }
});
