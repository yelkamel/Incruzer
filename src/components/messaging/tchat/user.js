import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { GiftedChat, Bubble, Composer } from 'react-native-gifted-chat';
import { Actions } from 'react-native-router-flux';

import styles from './style';

export default class Usertchat extends Component {

  render() {
    return (
      <View  style={styles.userTchat}>
        <View style={styles.headerTchat}>
          <View style={styles.headerIconLeftContainer}>
            <TouchableOpacity onPress={ () => Actions.pop() }>
              <Text style={styles.headerIconLeft}>{String( "<" )}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              {this.props.user.name}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>      
        <View style={styles.userImageContainer}>
          <Image 
            source={{ uri: this.props.user.picture }}
            style={styles.userImage}
          />
        </View>
      </View>
    );
  }
}