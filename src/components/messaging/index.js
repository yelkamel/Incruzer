
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity,
 Image, Dimensions, View, Text, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import styles from './style';
import moments, { me } from '../../dummyData';

class Messaging extends Component {

  static propTypes = {
    user: React.PropTypes.object,
    type: React.PropTypes.string,
  }

  getMomentsList() {
	  if ( typeof moments !== "undefined" && moments.length > 0 )
	  {
	    return moments.map((moment, key) => {
	      return (
	        <TouchableOpacity key={key} onPress={ () => Actions.tchat({ moment }) }>
	          <View style={styles.momentContainer}>
	            <View style={styles.momentLeftContainer}>
	              <View style={styles.momentImageContainer}>
	                <Image style={styles.momentImage} source={{ uri: moment.image }}>
	                </Image>
	              </View>
	              <Text style={styles.momentUserName}>{moment.user.name}</Text>
	            </View>
	            <View style={styles.momentRightContainer}>
	              <Text style={styles.textDistance}>à 300 m</Text>
	            </View>
	          </View>
	        </TouchableOpacity>
	      );
	    });
    }
  }

  getUsersList() {
    return me.friends.map((user, key) => {
      return (
        <TouchableOpacity key={key} onPress={ () => Actions.tchat({ user }) }>
          <View style={styles.userContainer}>
            <View style={styles.userLeftContainer}>
              <Image style={styles.userPicture} source={{ uri: user.picture }}>
              </Image>
            </View>
            <View style={styles.userRightContainer}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userLastMessage}>Dernier message ...</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.messagingHeader}>
          <Text style={styles.title}>DISCUSSION FLASH</Text>
          <Text style={styles.headerText}>Moments en cours de tes amis</Text>
        </View>
        <View style={styles.momentsList}>
          <ScrollView >
            {this.getMomentsList()}
          </ScrollView>
        </View>
        <View style={styles.usersList}>
          <ScrollView>
            {this.getUsersList()}
          </ScrollView>
        </View>
      </View>
    );  
  }
}

export default Messaging;