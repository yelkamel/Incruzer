import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  AsyncStorage,
}
from 'react-native';
import { Actions,ActionConst } 	from 'react-native-router-flux';
import Background 				from '../common/background';
import User 					from './user';
import theme 					from '../../themes/base-theme';
import styles 					from './style';
import { WS_FOLLOW_USER } 		from '../../constants';
import { protectedPost }		from '../../wsFetch';

export default class UsersProposal extends Component {

  constructor(props) {
    super(props);
  }

  getListUsers() {
    return this.props.users.map(
      (user, key) => {
        return(
          <View style={userProposalStyles.userItem} key={key}>
            <User detail={user} />
          </View>
        );
      }
    );
  }

 onSetFollowersSuccess = (responseData) => {
	if ( typeof responseData.success !== 'undefined' )
  	{
        setTimeout(()=>
                Actions.home({ type: ActionConst.RESET}),
                500)
  	}
  	else
  	{
	  	this.setState({ sendingData : false });
	  	console.log("Error on sending data");
  	}


  }

  onSetFollowersFail = (error) => {
	this.setState({ sendingData : false });
	console.log(error);
  }

 updateFollowers()
 {
	var structToSend = {

	};


	protectedPost(
		WS_FOLLOW_USER,
		structToSend,
		this.onSetFollowersSuccess,
		this.onSetFollowersFail
	);
 }

  render() {
    return(
      <View style={theme.container}>
        <Background>

          <TouchableOpacity
          	style={userProposalStyles.header}
          	onPress={
				() => {
                    this.updateFollowers()
            	}
        	}
          >
            	<Image
					source={
						require('../../../assets/icons/validation.png')
              		}
			  		style={theme.validation}>
			  	</Image>
          </TouchableOpacity>

          <View style={userProposalStyles.textContainer}>
            	<Text style={userProposalStyles.title}>
              		These cruisers might interest you!
			  	</Text>
          </View>

          <View style={userProposalStyles.listUsers}>
            	<ScrollView>
              		{this.getListUsers()}
			  	</ScrollView>
          </View>

        </Background>
      </View>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const userProposalStyles = StyleSheet.create({
  header: {
    flex:				0.6,
    paddingTop: 		15,
    paddingRight: 		20,
    flexDirection: 		'row',
    justifyContent: 	'flex-end',
    alignItems: 		'flex-start',
    width: 				deviceWidth,
  },
  title: {
    color: 				'#FFF',
    backgroundColor: 	'transparent',
    fontWeight: 		'bold',
    fontSize: 			18,
  },
  validateIcon: {
    height: 			50,
    width: 				50,
  },
  textContainer: {
    flex: 				0.7,
    justifyContent: 	'center',
    alignItems: 		'center',
  },
  listUsers: {
    flex: 				6,
    paddingBottom:		0,
    flexWrap: 			'wrap',
  },
  userItem: {
    width: 				deviceWidth,
    height: 			deviceHeight/8,
  }
});
