'use strict';

import React, { StyleSheet }  from 'react-native';
import theme from '../../../themes/base-theme';

export default StyleSheet.create({
  row:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonFollow: {
    borderColor: theme.blue,
    borderWidth: 3,
    borderRadius: 20,
    width: null,
    height: null,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textFollow:{
    color: theme.blue,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'HelveticaNeue',
  },
  textFollowPlus:{
    color: theme.blue,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'HelveticaNeue',
    position: 'absolute',
    left: 12,
    top: 4,
    backgroundColor: 'transparent'
  },
  buttonAlreadyFollow: {
    backgroundColor: theme.blue,
    borderColor: theme.blue,
    borderWidth: 3,
    borderRadius: 20,
    width: null,
    height: null,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 8,
  },
  textAlreadyFollow:{
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  addIcon: {
    color: theme.blue,
    fontSize: 18,
    marginRight: 10,
  },
  checkIcon: {
    color: '#fff',
    fontSize: 18,
  }

});
