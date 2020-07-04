'use strict';

import { StyleSheet, Dimensions , Platform }  from 'react-native';
const { width: deviceWidth, height: deviceHeight} = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width: deviceWidth - deviceWidth/5,
    height: deviceHeight - deviceHeight/ ( Platform.OS === 'ios' ? 3.6 : 2.8) ,
  },
  imageContainer: {
    flex: 2,
    backgroundColor: 'green'
  },
  image:{
    flex: 1,
    resizeMode: 'cover'
  },
  rowContainer:{
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt:{
    color: 'rgb(200, 200, 200)',
    fontWeight: 'bold',
  },
  date: {
    color: 'rgb(200, 200, 200)',
    fontWeight: 'bold',
  },
  address:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: "blue"
  },
  tag:{
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  }
});
