'use strict';

import { StyleSheet }  from 'react-native';

export default StyleSheet.create({
  container: {
    top:0, 
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  titleContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 10,
    height: 56
  },
  title:{
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 16,
    alignItems: 'center'
  }
});
