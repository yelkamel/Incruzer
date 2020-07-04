import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Clipboard,
  ToastAndroid,
  AlertIOS,
  Platform,
} from 'react-native';
import Share, { ShareSheet, Button } from 'react-native-share';
import update from 'react-addons-update';

import theme from '../../themes/base-theme';
import styles from './style.js';


export default class ShareSocialNetwork extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      switchFacebookIsOn: false,
      switchInstagramIsOn: false,
      switchTwitterIsOn: false,
      shareOptions : {
        title: "",
        message: "",
        url: this.props.response.uri,
        social: null,
        subject: "Share Link" //  for email
      }
    }
  }

  getSwitchIn() {
    return(
      <Image 
        source={require('../../../assets/icons/switchin.png')}
        style={{ width: 50, height: 25}}
      />
    );
  }

  getSwitchOut() {
    return(
      <Image 
        source={require('../../../assets/icons/switchout.png')}
        style={{ width: 50, height: 25}} 
      />
    );
  }

  getInstagramSwitch() {
    if (this.state.switchInstagramIsOn === true) {
      return(
        <TouchableOpacity
          opacity={1}
          onPress={() => {
            this.setState({ switchInstagramIsOn: false });
          }}
        >
          {this.getSwitchIn()}
        </TouchableOpacity>  
      );
    }
    return(
      <TouchableOpacity
        opacity={1}
        onPress={() => {
          this.setState({ switchInstagramIsOn: true });
          this.setSocial('instagram');
        }}
      >
        {this.getSwitchOut()}
      </TouchableOpacity>  
    );
  }

  getFacebookSwitch() {
    if (this.state.switchFacebookIsOn === true) {
      return(
        <TouchableOpacity
          opacity={1}
          onPress={() => {
            this.setState({ switchFacebookIsOn: false });
          }}
        >
          {this.getSwitchIn()}
        </TouchableOpacity>  
      );
    }
    return(
      <TouchableOpacity
        opacity={1}
        onPress={() => {
          this.setState({ switchFacebookIsOn: true });
          this.setSocial('facebook');
        }}
      >
        {this.getSwitchOut()}
      </TouchableOpacity>  
    );
  }

  getTwitterSwitch() {
    if (this.state.switchTwitterIsOn === true) {
      return(
        <TouchableOpacity
          opacity={1}
          onPress={() => {
            this.setState({ switchTwitterIsOn: false });
          }}
        >
          {this.getSwitchIn()}
        </TouchableOpacity>  
      );
    }
    return(
      <TouchableOpacity
        opacity={1}
        onPress={() => {
          this.setState({ switchTwitterIsOn: true });
          this.setSocial('twitter');
        }}
      >
        {this.getSwitchOut()}
      </TouchableOpacity>
    );
  }

  setSocial(socialNetwork) {
    let shareOptions = update(this.state.shareOptions, {
      social: { $set: socialNetwork },
    });
    this.setState({ "shareOptions": shareOptions }, () => {
      setTimeout(() => {
        Share.open(this.state.shareOptions);
      },300);
      
    });

    //don't do this
   /* let shareOptions = this.state.shareOptions;
    shareOptions.social = socialNetwork;
    this.setState({ "shareOptions": shareOptions }, () => {
      Share.shareSingle(this.state.shareOptions);
    });*/
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.socialNetworksContainer}>
          <View style={styles.socialNetworkContainer}>
            <View style={styles.iconSocialNetworkContainer}>
              <Image 
                style={{ width: 35, height: 35 }}
                source={require('../../../assets/icons/instagram.png')}
              />
            </View>
            {this.getInstagramSwitch()}
          </View>
          <View style={styles.socialNetworkContainer}>
            <View style={styles.iconSocialNetworkContainer}>
              <Image 
                style={{ width: 35, height: 35 }}
                source={require('../../../assets/icons/facebook.png')}
              />
            </View>
            {this.getFacebookSwitch()}
          </View>
          <View style={styles.socialNetworkContainer}>
            <View style={styles.iconSocialNetworkContainer}>
              <Image 
                style={{ width: 35, height: 35 }}
                source={require('../../../assets/icons/twitter.png')}
              />
            </View>
            {this.getTwitterSwitch()}
          </View>
        </View>
        <View style={styles.validationContainer}>
          <Image 
            style={{ width: 60, height: 60 }}
            source={
              require('../../../assets/icons/validation.png')
            }
          />
        </View>
      </View>
    );
  }
}
