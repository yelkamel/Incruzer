
import React, { Component } from 'react';
import { ScrollView, Image, Dimensions, View, Text } from 'react-native';

import { connect } from 'react-redux';

import FollowingCheck from './followingCheck';
import UserIcon from '../common/UserIcon';
import styles from './style';
import { me } from '../../dummyData';

type FOLLOWTYPE = 'FOLLOWING' | 'FOLLOWERS';

class Follow extends Component {

  static defaultProps = {
    user: {},
  };

  static propTypes = {
    user: 		React.PropTypes.object,
    usersList: 	React.PropTypes.array,
    type: 		React.PropTypes.string,
    width: 		React.PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  checkUserAlreadyAdded(user) {
    return me.following.find((following) => {
      return following == user.id;
    });
  }

  getStyleDisplayUserPictureByUserType(user) {
    return <UserIcon 
      stylesPremiumName={'smallBlackPremiumIconStyle'}
      user={user} />;
  }

  getUser(user, key) {
	  console.log("User : ", user);
	  console.log("Username : ", user.name);
	  
	  return(
	  		<View key={key} style={styles.followLine}>
	  			<View style={styles.followLineLeftContent}>
	  				<View style={styles.justifyVerticalContent}>
	  					{ this.getStyleDisplayUserPictureByUserType(user) }
	  				</View>
		      
	  				<View style={styles.justifyVerticalContent}>
	  					<Text style={styles.userName}>AAAAAAA{user.name}</Text>
	  				</View>  
	  			</View>
		      
		  		<View style={styles.followLineRightContent}>
			    	<View style={styles.addUserIconContainer}>
			    		<FollowingCheck user={user} />
					</View>
				</View>
			</View>
    );
  }

  getUserFollower(user, key) {
    return(
      <View key={key}>
        <Text>{user.name}</Text>
      </View>
    );
  }

  getUsersFollowing() {
	  
    let followings = this.props.user.following;
    
    if ( this.props.usersList ) 
    {
    	followings = this.props.usersList;
    }
    
    if( typeof followings !== "undefined" )
    {
		return followings.map(
	      (user, key) => this.getUser(user, key)
	    );    
    }
    
    return [];
    
  }

  getUsersFollowers() {
	  
    let followers = this.props.user.followers;
    
    if (this.props.usersList) 
    {
    	followers = this.props.usersList;
    }
    
    if(typeof followers != "undefined")
    {
	    console.log("Followers : ", followers);
	    return followers.map(
	      (user, key) => this.getUser(user, key)
	    );
    }
    
    return [];
  }

  getUsersFollow(type:FOLLOWTYPE) 
  {
    if( type == 'FOLLOWING' ) 
    {
    	return this.getUsersFollowing();
    }
    
    return this.getUsersFollowers();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={
        [
          {
            width: this.props.width ? this.props.width: null,
          }
        ]
      }>
        { this.getUsersFollow(this.props.type) }
      </ScrollView>
    );  
  }
}

export default Follow;