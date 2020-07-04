'use strict';

import { StyleSheet, Dimensions }  from 'react-native';

const {
  width: deviceWidth,
  height: deviceHeight
} = Dimensions.get("window");

const heightPopup = (deviceHeight- 60);
export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: -(deviceHeight/10 + 7),
    left: deviceWidth/65,
    width: (deviceWidth/5)*4,
    marginBottom: 30,
  },
  page: {
    flex: 1,
  },
});
