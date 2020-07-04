import React from 'react';
import {Image, View, Text,} from 'react-native';
import styles from './style';

const ImageMarker = ({moment:{image, cluster, unread}}) => (
  <View style={styles.container}>
    <Image style={styles.imageContainer}
      source={
        unread ?
        require('../../../../assets/icons/moment.png')
        :
        require('../../../../assets/icons/moment.png')
      }
    >
      <Image
        source={require('../../../../assets/images/spinner.gif')}
        style={styles.imageContainer}
      >
        <Image
          style={styles.image}
          source={{uri: image}}
        /> 
      </Image>
    </Image>
    {
      cluster && 
      <View style={styles.cluster}>
      <Text style={styles.txtClustor}>5</Text>
    </View>
    }
  </View>
)

export default ImageMarker;
