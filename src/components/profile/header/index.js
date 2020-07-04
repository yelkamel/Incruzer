'use strict';

import React, { Component } from 'react';

import { Text, View , TouchableOpacity, Image, Alert, } from 'react-native';
import { Actions } from 'react-native-router-flux';


import styles 		from './style';
import Background 	from '../../common/background';
import UserIcon 	from '../../common/UserIcon';

 
class Header extends Component{

  reportUser(){
    Alert.alert(
      'Info',
      `Signaler ${this.props.user.name}`,
      [
        {text: 'Signaler un abus', onPress: () => this.confirmReportUser()},
        {text: 'Anuuler', onPress: () => {}},
      ]
    )
  }

  confirmReportUser() {
    Alert.alert(
      'Info',
      `Tu confirmes que tu souhaites déclarer ce tag en abus ?`,
      [
        {text: 'Oui', onPress: () => {}},
        {text: 'Nom', onPress: () => {}},
      ]
    )
  }

  render(){
    const {
      blockBottom=true,
      closeModal,
      user,
      isfollowing,
      openTabModal
    } = this.props;

    return (
      <View 
        style={styles.header}
        //horizontal={true}
        //showBorder={true}
      >
        <View style={styles.row}>
          	<View style={styles.blokLeft}>
            	<TouchableOpacity
					onPress={ () => this.reportUser() }
					onLongPress={ () => this.reportUser() }
				>
					<Image
						source={require('../../../../assets/icons/reportBlack.png')} 
						style={[
							styles.icon,
							isfollowing ? styles.isfollow : {}
						]} 
					/>
				</TouchableOpacity>
			</View>
          
			<View style={styles.blockUserPicture}>
				<View style={styles.userProfilePicture}>
					<UserIcon
					      displayProIcon={false}
					      stylesPremiumName={'bigWhitePremiumIconStyle'}
					      user={user}
					/>
				</View>
			</View>
			
			
			<View style={styles.blokRight}>
            	<TouchableOpacity 
					onPress={() => closeModal()}
					onLongPress={() => closeModal()}
				>
					<Image 
						source={
							require('../../../../assets/icons/closeWithCircle.png')
                		} 
		                style={[
		                  styles.iconClose,
		                  isfollowing ? styles.isfollow : {}
		                ]} 
					/>
				</TouchableOpacity>
			</View>
        </View>
        
      </View>
    )
  }
}

export default Header;
