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

export default class Momenttchat extends Component {

  render() {
    return (
      <View  style={styles.momentTchat}>
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
        <View style={styles.momentImageContainer}>
          <Image 
            source={{ uri: this.props.image }}
            style={styles.momentImage}
          />
        </View>
        <View style={styles.momentInfo}>
          <View style={styles.momentInfoContainer}>
            <Text style={styles.textDistance}>à 300 m</Text>
          </View>
          <View style={styles.momentInfoContainer}>
            <Text style={styles.nbrMinutes}>45</Text>
            <Text style={styles.min}>min</Text>
          </View>
        </View>
      </View>
    );
  }
}