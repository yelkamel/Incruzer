import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Permissions from 'react-native-permissions';

const { height: deviceHeight, width: deviceWidth} = Dimensions.get("window");

import Background from '../common/background';

export default class Authorize extends Component {
  
  constructor(props) {
    super(props);
  }
  

  _requestPermission = () => {
    Permissions.requestPermission(this.props.permission)
      .then(response => {
        this.props._updatePermissions(response);

        if (response !== 'authorized') {
          Permissions.openSettings
        }
      }).catch(e => console.log(e))
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/logos/logo.png')}
            style={styles.logo}>
          </Image>
        </View>
        <View style={styles.backgroundContainer}>
          <Background 
            horizontal={true}
            style={{ borderRadius: 10 }}
          >
            <View style={styles.row}>
              <Text style={styles.textMessage}>
                {this.props.message}
              </Text>
            </View>
          </Background> 
        </View>
        <TouchableOpacity
          onPress={this._requestPermission}
          style={styles.activateContainer}
        >  
          <Text style={styles.text}>Activate</Text>
        </TouchableOpacity>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    paddingTop: deviceWidth/6,
  },
  row:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  backgroundContainer: {
    borderRadius: 20,
    borderWidth: 10,
    borderColor: 'white',
    width: deviceWidth- 40,
    height: deviceHeight/5,
    marginBottom: 20
  },
  activateContainer:{
    height: deviceWidth/4,
    width: deviceWidth/4,
    borderRadius: deviceWidth/8,
    borderColor: 'white',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textMessage:{
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  logoContainer: {
    position: 'absolute',
    zIndex: 20,
    top: 0,
    left: (deviceWidth - deviceWidth/3)/2,
  },
  logo: {
    height: deviceWidth/4,
    width: deviceWidth/4,
    resizeMode: 'contain'
  },
});

