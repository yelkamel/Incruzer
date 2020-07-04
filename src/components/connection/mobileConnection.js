import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
} from 'react-native';

import { Actions } 		 from "react-native-router-flux";
import { users } 		 from '../../dummyData';
import Background 		 from '../common/background';
import Input 			 from '../common/input';
import theme 			 from '../../themes/base-theme';
import styles 			 from './style';
import { WS_REGISTER } 	 from '../../constants';
import { unprotectedPost } from '../../wsFetch';

export default class MobileConnection extends Component {

  static porpTypes =  {
    detail: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      username		: null,
      name			: null,
      error		  	: false,
      sendingData 	: false
    }
  }

  setUsername = (username) => {
    this.setState({
      username,
    });
  }

  setName = (name) => {
    this.setState({
      name,
    });
  }
  
  
  onVerifySuccess = (responseData) => {
	  	if ( typeof responseData.token !== 'undefined' )
	  	{
		  	console.log("Json :", responseData);
		  	AsyncStorage.setItem("userToken", 		responseData.token);
		  	AsyncStorage.setItem("refreshToken", 	responseData.refreshToken);
		  	AsyncStorage.setItem("userId", 			responseData.userId);
		  	
			Actions.phoneNumber({ token : responseData.token, userId : responseData.userId });
	  	}
	  	else
	  	{
		  	this.setState({ sendingData : false });
		  	console.log("Error");
	  	}

  }
  
  onVerifyFail = (responseData) => {
	  this.setState({ sendingData : false });
	  console.error(error);
  }


  render() {
    return(
      <View style={styles.container}>
        <Background>
          <View style={mobileConnectionStyle.container}>

            	<View style={mobileConnectionStyle.textContainer}>
					<Text style={mobileConnectionStyle.textWhiteBold}>
						Hello ! Whats your name ?
					</Text>
				</View>

				<View style={mobileConnectionStyle.inputGroupContainer}>
					<View style={mobileConnectionStyle.inputContainer}>
						<Input
							setStateInputValue={this.setUsername}
							placeholderTextColor="#FFFFFF"
				            placeholder={ 'Username' }
				            placeholderTextColor={'#FFFFFF'}
				            placeholderStyle={{ color: "#FFFFFF", fontWeight: 'bold', fontSize: 17, fontFamily: 'HelveticaNeue' }}
						/>
					</View>
					<View style={mobileConnectionStyle.errorContainer}>
					{ this.state.error &&
						<Text style={mobileConnectionStyle.textError}>
							Already taken !
						</Text>
                	}
					</View>
				</View>

				<View style={mobileConnectionStyle.inputGroupContainer}>
					<View style={mobileConnectionStyle.inputContainer}>
						<Input
							setStateInputValue={this.setName}
							placeholderTextColor="#FFFFFF"
				            placeholder={ 'Name' }
				            placeholderTextColor={'#FFFFFF'}
				            placeholderStyle={{ color: "#FFFFFF", fontWeight: 'bold', fontSize: 17, fontFamily: 'HelveticaNeue' }}
						/>
					</View>
					<View style={mobileConnectionStyle.errorContainer}>
					</View>
				</View>

				<View style={mobileConnectionStyle.iconContainer}>
					<TouchableOpacity
						onPress={
							() => {
								if (this.state.sendingData)
								{
									return;
								}

								if (this.state.username == users.dev.snapshot)
								{
									this.setState({ error: true });
                    			}
                    			else
                    			{
	                    			this.setState({ sendingData : true });
	                    			var structToSend = {
										  username    : this.state.username,
										  name  	  : this.state.name,
										  phoneNumber : "",
		   						    };
		   						    
									unprotectedPost(
										WS_REGISTER,
										structToSend,
										this.onVerifySuccess,
										this.onVerifyFail	
									);

                    			}
                  			}
                		}
					>
						{ !this.state.sendingData &&
							<Image
								style={mobileConnectionStyle.validateIcon}
								source={
									require('../../../assets/icons/validation.png')
	                  			}
					  		/>
				  		}
				  		{ this.state.sendingData &&
							<Image
								style={mobileConnectionStyle.validateIcon}
								source={
									require('../../../assets/icons/spinner carte.gif')
	                  			}
					  		/>
				  		}

				  	</TouchableOpacity>
				</View>
          </View>
        </Background>
      </View>
    );
  }

}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const mobileConnectionStyle = StyleSheet.create({
  container: {
    height: 			deviceHeight/2.8,
    width: 				deviceWidth,
    flexDirection: 		'column',
    justifyContent: 	'center',
    alignItems: 		'center',
    marginTop:			deviceHeight/4.5,
  },
  textWhiteBold: {
    fontWeight: 		'bold',
    color: 				'#FFFFFF',
    backgroundColor: 	'transparent',
    fontSize: 			18,
    fontFamily: 		'HelveticaNeue',
  },
  textContainer: {
    flex: 				0.7,
    justifyContent: 	'center',
    alignItems: 		'center',
    padding: 			0,
    margin: 			0,
  },
  inputGroupContainer: {
    flex: 				1.2,
    flexDirection: 		'row',
    marginTop: 			-10,
    position: 			'relative',
  },
  inputContainer: {
    flex: 				5,
    flexDirection: 		'row',
    justifyContent: 	'center',
    paddingTop: 		10,
    paddingBottom: 		10
  },
  errorContainer: {
    flex: 				1,
    flexDirection: 		'row',
    justifyContent: 	'center',
    alignItems: 		'center',
    paddingLeft: 		10,
    width: 				( (deviceWidth / 10) *2),
    height: 			"100%",
    position: 			'absolute',
    right: 				0,
    top: 				0,
    zIndex: 			10
  },
  textError: {
    color: 				'red',
    fontSize: 			11,
  },
  iconContainer: {
    flex: 				1,
    flexDirection: 		'row',
    justifyContent: 	'center',
    alignItems: 		'center',
    width: 				60
  },
  validateIcon: {
    height: 			55,
    width: 				55,
  },
});
