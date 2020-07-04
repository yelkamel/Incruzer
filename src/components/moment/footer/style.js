'use strict';

import { StyleSheet, Dimensions }  from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  footer: {
  	height: deviceHeight/7,
  	flexDirection: 'row',
    alignItems: 'center',
  	padding: 10,
  },
  blokLeft: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  blokRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 32
  },
  swipeTags: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
  },
  icon:{
    marginHorizontal: 4
  },
});
