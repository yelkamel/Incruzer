import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Permissions from 'react-native-permissions';

const { height: deviceHeight, width: deviceWidth} = Dimensions.get("window");


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
        
        <Text style={styles.textMessage} numberOfLines={2}>
          {this.props.message}
        </Text>
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
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  activateContainer:{
    height: deviceWidth/4,
    width: deviceWidth/4,
    borderRadius: deviceWidth/8,
    borderColor: 'black',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textMessage:{
    width: deviceWidth/2,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 15,
    color: 'black',

  },
});

