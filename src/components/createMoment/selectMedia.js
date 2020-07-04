
import ImagePicker from 'react-native-image-picker';
import { Actions } from "react-native-router-flux";

export default selectMedia = () => {
  const options = {
    title: null,
    storageOptions: {
      skipBackup: true,
    },
    mediaType: 'mixed',
  };

  ImagePicker.launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      Actions.createMomentValidation({ response });
    }
  });
};

export const selectVideo = () => {
  const options = {
    title: null,
    takePhotoButtonTitle: 'Sélectionner une video',
    mediaType: 'video',
  };
  
  ImagePicker.launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled video picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      response.type = 'video';
      Actions.createMomentValidation({ response });
    }
  });
};