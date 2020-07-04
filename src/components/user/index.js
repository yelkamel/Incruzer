'use strict';

import React, { Component } from 'react';

import { Animated, Text, ScrollView,  RefreshControl, View, Image, TouchableOpacity, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { me } from '../../dummyData';

import Notifications 	from '../notifications';
import Invite 			from './invite';
import UserIcon 		from '../common/UserIcon';
import Input 			from '../common/input';
import theme 			from '../../themes/base-theme';
import styles 			from './style';
import Search 			from '../common/search';
import { colors, images, metrics, appStyle } from '../../themes'

export default class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visibleInvite: false,
      displayLoader: false,
    };
  }

  setVisibleInvite = () => {
    this.setState({visibleInvite: !this.state.visibleInvite});
  }

  handleScroll = (event: Object) => {
    this.setState({ displayLoader: true }, () => {
      setTimeout(() => this.setState({ displayLoader: false }), 3000);
    });
  };

  render (){
    return (
      <View style={[styles.container]}>
          <Image
              source={images.profilUser}
              style={{flex:1}}
          />
      </View>
    )
  }
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.headerContainer}>
          	<View style={styles.header}>
	          	<TouchableOpacity onPress={() => Actions.pop()} >
	            	<Image
	                	source={require('../../../assets/icons/arrow-left.png')}
						style={[styles.icon]}
					/>
	            </TouchableOpacity>

	            <Text style={styles.username}>{me.name}</Text>

	            <TouchableOpacity onPress={() => Actions.setting()} >
	            	<Image
	                	source={require('../../../assets/icons/settings.png')}
						style={[styles.icon]}
					/>
	            </TouchableOpacity>
			</View>
        </View>

          	<View style={[styles.userContainer, {  }]}>
	            <View  style={styles.row}>
	            	   <UserIcon
			              stylesPremiumName={'myAccountWhitePremiumIconStyle'}
			              user={me}
			            />


		            <TouchableOpacity
		              onPress={
		                () => {}
		              }
		              style={styles.textContainer}
		            >
		            	<Text style={styles.text}>{me.nbCruises}</Text>
						<Text style={styles.textLabel}>Cruises</Text>
		            </TouchableOpacity>

		            <TouchableOpacity
		              onPress={
		                () => Actions.usersList({ typeFollow: 'FOLLOWERS' })
		              }
		              style={styles.textContainer}
		            >
		            	<Text style={styles.text}>{me.nbFollowers}</Text>
						<Text style={styles.textLabel}>Followers</Text>
		            </TouchableOpacity>

		            <TouchableOpacity
		              onPress={
		                () => Actions.usersList({ typeFollow: 'FOLLOWING' })
		              }
		              style={styles.textContainer}
		            >
		            	<Text style={styles.text}>{me.nbFollowing}</Text>
						<Text style={styles.textLabel}>Following</Text>
		            </TouchableOpacity>
		        </View>

	        </View>

            <View style={[styles.row, {  }]}>

            <Search
              	filter={ (textSearch) => this.setState({ textSearch }) }
	            right={
                <TouchableOpacity
                  style={styles.blockContainer}
                  onPress={() => { console.log("Pass"); }}
                >
                  <Image
                    source={require('../../../assets/icons/search.png')}
                    style={[styles.icon]}
                  />
                </TouchableOpacity>
              }
            />
            </View>

          	{
            	this.state.displayLoader &&

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
			 	<Notifications
	           		setVisibleInvite={() => this.setVisibleInvite()}
			   	/>
		   	</ScrollView>
      {
        this.state.visibleInvite &&
        <Invite
          setVisibleInvite={() => this.setVisibleInvite()}
        />
      }
      </View>
    )
  }
}
