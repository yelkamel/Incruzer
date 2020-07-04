import React, { Component } from 'react';
import {
  Platform,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import selectMedia from './selectMedia';
import styles from './style.js';

export default class Picker extends Component {

  static propTypes = {
    setSlectMedia: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return(
      <View style={[styles.pickerContainer]}>
        <TouchableOpacity
          style={[styles.typeButton]}
          onPress={ () => {
              if(Platform.OS == 'android') {
                this.props.setSlectMedia(true);
              } else {
                selectMedia();
              }
            }
          }
        >
          <Image
            source={ require('../../../assets/icons/biblio.png') }
            style={styles.icon}
          />
        </TouchableOpacity>   
      </View>
    );
  }

}
