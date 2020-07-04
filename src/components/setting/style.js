'use strict';

import { StyleSheet, Dimensions }  from 'react-native';
import theme from '../../themes/base-theme';

const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: 'gray',
    height: deviceHeight/8,
    paddingVertical: 3,
    paddingTop: 20,
    flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    height: deviceHeight/10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: 'gray',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,  
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
