import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
}
from 'react-native';
import { Actions } 				from 'react-native-router-flux';
import DeviceInfo 				from 'react-native-device-info';
import codes 					from '../../countriestocodesphone';
import Background 				from '../common/background';
import Input 					from '../common/input';
import theme 					from '../../themes/base-theme';
import styles 					from './style';
import { WS_PHONE_NUMBER } 		from '../../constants';
import Spinner from 'react-native-spinkit';

import { protectedPost } 		from '../../wsFetch';



export default class PhoneNumber extends Component {

  static porpTypes =  {

  }

  constructor(props) {
    super(props);
    this.state = {
      number: null,
      code: '+' + codes[ DeviceInfo.getDeviceCountry()],
    }
  }

  setNumber = (number) => {
    this.setState({
      number,
    });
  }

  setCode = (code) => {
    this.setState({
      code,
    });
  }

  onSetPhoneSuccess = (responseData) => {
	if ( typeof responseData.code !== 'undefined' )
  	{
	  	Actions.smsCode({
          phoneNumber: this.state.code + this.state.number,
          userId 	 : this.props.userId
        });
  	}
  	else
  	{
	  	this.setState({ sendingData : false });
	  	console.log("Error");
  	}


  }

  onSetPhoneFail = (responseData) => {
	this.setState({ sendingData : false });
	console.error(error);
  }

  render() {
    const { code, number } = this.state;
    const { token, userId } = this.props;

    console.log("My token :" + token);

    return(
      <View style={styles.container}>
        <Background>
          <View style={phoneNumberStyle.container}>
            <View style={phoneNumberStyle.textContainer}>
              <Text style={theme.textWhiteBold}>
                We will send you a code by sms to confirm your account.
              </Text>
            </View>

            <View style={phoneNumberStyle.inputGroupContainer}>

            	<View style={phoneNumberStyle.codeContainer}>
					<Input
						defaultValue={code}
						width={60}
						borderRadius={25}
						color={'#FFFFFF'}
						setStateInputValue={this.setCode}
					/>
				</View>

				<View style={phoneNumberStyle.inputContainer}>
            		<Input
            			setStateInputValue={this.setNumber}
            			keyboardType="numeric"
            		/>
				</View>
            </View>


            <View style={phoneNumberStyle.iconContainer}>
                <TouchableOpacity
              		onPress={
						() => {
							if (this.state.sendingData)
							{
								return;
							}

							if (this.state.number == "" || this.state.number == null )
							{
								this.setState({ error: true });
	            			}
	            			else
	            			{
	                			this.setState({ sendingData : true });
	                			var structToSend = {
									  phoneNumber : this.state.number,
									  phoneCode   : this.state.code,
									  userId	  : userId,
									  token		  : token
	   						    };


								protectedPost(
									WS_PHONE_NUMBER,
									structToSend,
									this.onSetPhoneSuccess,
									this.onSetPhoneFail
								);
	            			}
	          			}
	        		}
	            >
                { !this.state.sendingData &&
					<Image
						style={phoneNumberStyle.validateIcon}
						source={
							require('../../../assets/icons/validation.png')
              			}
			  		/>
		  		}
		  		{ this.state.sendingData &&
                    <Spinner
                        style={phoneNumberStyle.validateIcon}
                        isVisible={true}
                        size={60}
                        type="Bounce"
                        color="white"/>
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
const phoneNumberStyle = StyleSheet.create({
  container: {
    height: 			deviceHeight/2.8,
    width: 				deviceWidth,
    flexDirection: 		'column',
    justifyContent: 	'center',
    alignItems: 		'center',
    marginTop:			deviceHeight/4.5,
  },
  textContainer: {
    flex: 				1,
    justifyContent: 	'center',
    alignItems: 		'center',
    padding: 			10,
  },
  inputGroupContainer: {
    flex: 				1,
    flexDirection: 		'row',
    justifyContent: 	'center',
    alignItems: 		'center',
  },
  inputContainer: {
    flex: 				3,
    flexDirection: 		'row',
    justifyContent:		'flex-start',
    alignItems: 		'flex-start',
    marginLeft: 		5,
  },
  codeContainer: {
    flex: 				1,
    flexDirection: 		'row',
    justifyContent: 	'center',
    alignItems: 		'center',
    marginLeft: 		8,
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
