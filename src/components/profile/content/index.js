'use strict';

import React, { Component } from 'react';

import { Animated, Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


import FollowingCheck from '../../follow//followingCheck';
import UserIcon from '../../common/UserIcon';

import styles from './style';

const Content = ({user, isfollowing, followers, following}) => (
  <View style={[styles.content]}>

	<View style={styles.blockUserInfo}>

    	<TouchableOpacity>
			<View style={styles.textContent, { flexDirection: 'row' }}>
				<Text style={styles.textUserSnapshot}>{user.snapshot}</Text>
			</View>
		</TouchableOpacity>
	</View>

    <View style={[styles.textContent, { flexDirection: 'row' }]}>
      <Text style={styles.name}>{user.name}</Text>
        { user.type === 1 &&
          <Image
            source={require('../../../../assets/icons/pro.png')}
            style={styles.iconPro}
          />
        }
    </View>

    <View style={[styles.userStatsContainer]}>

		<TouchableOpacity
			style={styles.userStatsItem}
		>
				<Text style={styles.userStatsCount}>{followers}</Text>
				<Text style={styles.userStatsLabel}>Followers</Text>
		</TouchableOpacity>

		<TouchableOpacity
			style={styles.userStatsItem}
		>
				<Text style={styles.userStatsCount}>{following}</Text>
				<Text style={styles.userStatsLabel}>Following</Text>
		</TouchableOpacity>
    </View>

    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }} />

      <View style={{ flex: 4, flexDirection: 'row' }}>
        <View style={{ flex: 1 }} />

        <View style={{ flex: 4 }}>
          <FollowingCheck user={user} />
       </View>
        {
          isfollowing ?
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => closeModal()}>
                <Image
                  source={
                    require('../../../../assets/icons/chatWithCircle.png')
                  }
                  style={[styles.icon]}
                />
            </TouchableOpacity>
          </View>
          :
          <View style={{ flex: 1 }} />
        }
      </View>

      <View style={{ flex: 1 }} />
    </View>
  </View>
)

export default Content;
