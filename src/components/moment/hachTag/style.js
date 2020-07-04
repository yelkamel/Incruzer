'use strict';

import { StyleSheet, Dimensions }  from 'react-native';
const deviceHeight = Dimensions.get('window').height;

export  default StyleSheet.create({
  container: {
    height: deviceHeight/8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hachTagContainer:{
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scroll:{
    padding: 10,
    flex: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    marginHorizontal: 2,
  },
  report:{
    width: 40,
    resizeMode: 'contain',
    marginRight: 20,
    tintColor: 'black'
  }
});
