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

  },
  modalContainer: {
    flex: 1,
    margin: 30,
    backgroundColor:"white",
    borderRadius: 10,
    height: deviceHeight/4
  }
});
