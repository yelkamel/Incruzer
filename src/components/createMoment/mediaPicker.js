import React, { Component } from 'react';
import {
  Platform,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import styles from './style.js';
import ImagePicker from 'react-native-image-picker'


const options = {
  title: 'Selectioner une photo',
  cancelButtonTitle: 'retour',
  customButtons: [
    {
        name: 'fb',
        title: 'Choose Photo from Facebook'
    },
  ],
  takePhotoButtonTitle: null,
  storageOptions: {
    skipBackup: true,
  },
  mediaType: Platform.OS === 'ios' ? 'mixed' : 'photo',
  videoQuality: 'medium',
  durationLimit: 10,

};

export default class MediaPicker extends Component {

  static propTypes = {
    gotoValidation: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  setMediaSelected = () => {
      ImagePicker.showImagePicker(options, (response) => {

      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = {
            uri: response.uri,
            type: 'image'
        };

        this.props.gotoValidation(source)
      }
    })
   }

  render() {
    return(
      <View style={[styles.pickerContainer]}>
        <TouchableOpacity
          style={[styles.typeButton]}
          onPress={ () => {
                this.setMediaSelected();
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
