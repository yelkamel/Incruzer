
import React, { Component } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const NoData = ({text=''}) => (
  <View style={styles.container}>
    <Image
      style={{ 
        width: 100, 
        height: 100
      }}
      source={require('../../../../assets/logos/logo2.png')} 
    />
    <Text style={styles.text}>
      No {text} for the moment
    </Text>
  </View>
);

const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight - deviceHeight/ ( Platform.OS === 'ios' ? 3.6 : 2.8) ,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgb(190, 190, 190)',
  }
});

export default NoData;