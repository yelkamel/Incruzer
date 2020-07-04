
import React, { Component, } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  PanResponder
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import styles from './style';
import AnimateBorderCircle from '../../common/animateBorderCircle';

const deviceWidth = Dimensions.get('window').width;


const Footer = ({zoomIn, zoomOut, coordinateUser, fitToCoordinateUser, displayTchatPopIn})  => (
  <View>
  	<View style={styles.middleLeftContainer}>
      <TouchableOpacity
        onPress={( ) => fitToCoordinateUser() }
      >
        <Image
          style={ styles.iconMixed }
          source={ require('../../../../assets/icons/target.png') }
        />
      </TouchableOpacity>

    </View>
    <View style={styles.middleContainer}>
      <TouchableOpacity
        onPressIn={( ) => zoomIn(true) }
        onPressOut={() => zoomIn(false) }
      >
        <Image
          style={ styles.iconMixed }
          source={ require('../../../../assets/icons/zoom.png') }
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={( ) => zoomOut(true)  }
        onPressOut={() => zoomOut(false) }
      >
        <Image
          style={ styles.iconMixed }
          source={ require('../../../../assets/icons/dezoom.png') }
        />
      </TouchableOpacity>
    </View>
    <View style={ styles.footerContainer }>
      <View style={ styles.rowContainer }>

      </View>
      <View style={[
          styles.rowContainer,
          styles.camera,
        ]}
      >
        <TouchableOpacity
          onPress={() => Actions.createMoment({coordinateUser: coordinateUser})}
        >
          <AnimateBorderCircle
            animated={false}
            rayon={deviceWidth/6}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.profilUser}
          onPress={() => Actions.user()}
        >
          <Image
            style={styles.icon}
            source={require('../../../../assets/icons/user.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default Footer;
