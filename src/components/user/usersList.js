'use strict';

import React, { Component } from 'react';

import { 
  Animated,
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import UserIcon 			 from '../common/UserIcon';
import Input 				 from '../common/input';
import theme 				 from '../../themes/base-theme';
import styles 				 from './style';
import Follow 				 from '../follow';
import Search 				 from '../common/search';
import { me, usersList }	 from '../../dummyData';
import { protectedGet }		 from '../../wsFetch';
import { 
	WS_FOLLOWERS_USER,
	WS_FOLLOWING_USER
	 } 						 from '../../constants';

export default class UsersList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      //usersList: usersList,
      displayLoader: true,
    };
  }

  filter = (textSearch) => {
    
    if(typeof usersList !== "undefined")
    {
	    const searchUsers = usersList.filter(user => 
	      user.name.toLowerCase().includes(textSearch.toLowerCase())
	    );
	    
	    this.setState({
	      usersList: searchUsers,
	    });
    }
  }

  handleScroll = (event: Object) => {
    this.setState({ displayLoader: true }, () => {
      setTimeout(() => this.setState({ displayLoader: false }), 3000);
    });
  };
  
  onLoadFollowersSuccess = (responseData) => {
	  	var futureState = { displayLoader : false };
	  	
	  	if ( typeof responseData.followers !== "undefined" && responseData.followers.length > 0 )
	  	{
		  	futureState.usersList = responseData.followers;
		}
		
		this.setState(futureState);
  }
  
  onLoadFollowersFail = (error) => {
	  	this.setState({ displayLoader: false, });
		console.error(error);
  }
  
  
  onLoadFollowingSuccess = (responseData) => {
	  	var futureState = { displayLoader : false };
	  	
	  	if ( typeof responseData.followers !== "undefined" && responseData.followers.length > 0 )
	  	{
		  	futureState.usersList = responseData.following;
		}
		
		this.setState(futureState);
  }
  
  onLoadFollowingFail = (error) => {
	  	this.setState({ displayLoader: false, });
		console.error(error);
  }
  
  componentDidMount(){
	  	if ( this.props.typeFollow == "FOLLOWERS" )
	  	{
		  	protectedGet(
				WS_FOLLOWERS_USER,
				this.onLoadFollowersSuccess,
				this.onLoadFollowersFail
			);
		}
		else
		{
			protectedGet(
				WS_FOLLOWING_USER,
				this.onLoadFollowingSuccess,
				this.onLoadFollowingFail
			);

		}
  }


  render() {
    const { typeFollow } = this.props;
    
    var  _title = ( typeFollow == "FOLLOWERS" ) ? "Followers" : "Following";
    return (
      <View style={[styles.container]}>
      		<View style={styles.followersHeaderContainer}>
	  			<View  style={styles.followersHeader}>
	  				<TouchableOpacity  
	  					style={styles.arrowLeftIconContainer} 
	  					onPress={() => Actions.pop()} 
	  				>
	  					<Image
	  						source={require('../../../assets/icons/arrow-left.png')}
	  						style={[styles.icon]}
	  					/>
	  				</TouchableOpacity>
	  				
	  				<View style={[styles.titleContainer, { paddingRight: 35 }]}>
	  					<Text style={theme.title}>{ _title }</Text>
	  				</View>
              
	  			</View>
            
	            <View  style={styles.row}>
	              <Search
	                filter={ (textSearch) => this.filter(textSearch) }
	              />
	            </View>
            
          </View>
          { this.state.displayLoader &&
            <Image
              source={require('../../../assets/icons/loading.gif')}
            />
          }
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={ Platform.OS === 'ios' && this.state.displayLoader}
                onRefresh={this.handleScroll}
                tintColor={'transparent'}
              />
            }
          >
            <View style={[{ flex: 1, paddingHorizontal: 20 }]}>
              <Follow 
                type={typeFollow}
                usersList={this.state.usersList}
              />
            </View>
          </ScrollView>
      </View>
    );
  }

}