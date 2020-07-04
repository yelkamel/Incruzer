import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from "react-native-router-flux";
import * as Animatable from 'react-native-animatable';
import Button from '../common/button';
import Background from '../common/background';
import RecordingAnimation from '../common/RecordingAnimation';
import Video from 'react-native-video';
import theme from '../../themes/base-theme';
import styles from './style';
import { colors, images, metrics, appStyle } from '../../themes'
import FbConnexion from './fbConnexion'

class Connection extends Component {

  constructor(props) {
    super(props);
  }


  renderLogoAnimation(){
      return (
          <Animatable.View
              ref={(c) => this.logoView = c}
              style={styles.logoContainer}
              animation="bounceInLeft"
              easing="ease-out"
              duration={1000}
              iterationCount={1}
              >
              <Image
                source={images.logo}
                style={styles.logo}>
              </Image>
          </Animatable.View>
      )
  }

/*
<TouchableOpacity
  onPress={() => {
    Actions.instagramUsersProposal();
  }}
>
  <View style={[styles.buttonContainer, {marginTop: -0}]}>
    <Button
      iconSource={require('../../../assets/icons/instagram.png')}
      text={'Instagram connect'}
    />
  </View>
</TouchableOpacity>


 */

  render() {

    return(
      <View style={[theme.container,{backgroundColor: colors.jaune}]}>
          <Video
            resizeMode='cover'
            source={images.introVideo}
            style={[appStyle.fullScreen, {opacity: 0.4}]}
            muted={true}
            resizeMode="cover"
            paused={true}
            repeat={true}/>
        <RecordingAnimation duration={7000} delay={100}/>

          {this.renderLogoAnimation()}
          <View style={styles.buttonsContainer}>
            <FbConnexion />
                <TouchableOpacity
                  onPress={() => {
                    Actions.mobileConnection();
                  }}
                >
                  <View style={styles.buttonContainer}>
                    <Button
                      iconSource={require('../../../assets/icons/instagram.png')}
                      text={'Mobile connect'}
                    />
                  </View>
                </TouchableOpacity>

          </View>

        </View>

    )
  }
}

export default Connection;
