
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';

import theme 				from '../../../themes/base-theme';
import { me } 				from '../../../dummyData';
import { WS_FOLLOW_USER } 	from '../../../constants';
import { protectedPost } 	from '../../../wsFetch';

class FollowingCheck extends Component {

  static propTypes = {
    user: React.PropTypes.object,
  }

  renderFollowButton() {
    if (this.checkUserAlreadyAdded()) {
      return (
        <TouchableOpacity style={styles.buttonAlreadyFollow}>
          <Image
            style={theme.icon}
            source={require('../../../../assets/icons/check.png')} 
          />
        </TouchableOpacity>
      );
    }
    // using "OnPressIn" instead of "OnPress" to avoid RN bug #10822
    return (
      <TouchableOpacity 
      	style={styles.buttonFollow}
      	delayPressIn={0} 
      	onPressIn={
			() => {
				this.followUser();
  			}
		}
      >
      	<Text style={styles.textFollowPlus}>+</Text>
        <Text style={styles.textFollow}>Follow</Text>
      </TouchableOpacity>
    );
  }

  checkUserAlreadyAdded() {
    return me.following.find((following) => {
      return following === this.props.user.id;
    });
  }
  
  
  onAddFollowerSuccess = (responseData) => {
	  	console.log("Add follow : ", responseData);		
		this.setState(futureState);
  }
  
  onAddFollowerFail = (error) => {
	  	this.setState({ displayLoader: false, });
		console.log("Error !", error);
  }
  
  followUser = () => {
	  console.log("Trigger");
	  var structToSend = {
		  userIds:[this.props.user.id]
	  };
	  
	  protectedPost(
		  WS_FOLLOW_USER,
		  structToSend,
		  this.onAddFollowerSuccess,
		  this.onAddFollowerFail
	  )
	  
  }

  render() {
	  console.log("Entering");
    return (
      <View style={styles.row}>
        {this.renderFollowButton()}
      </View>
    );  
  }
}

export default FollowingCheck;