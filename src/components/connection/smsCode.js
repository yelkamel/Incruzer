import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
}
from 'react-native';

import { Actions,ActionConst } 				from 'react-native-router-flux';
import Background 				from '../common/background';
import Input 					from '../common/input';
import theme 					from '../../themes/base-theme';
import styles 					from './style';
import { codeSentBySms } 		from '../../dummyData';
import { WS_SMS_VERIFY_CODE } 	from '../../constants';
import { protectedPost } 		from '../../wsFetch';
import Spinner from 'react-native-spinkit';

export default class SmsCode extends Component {

  static porpTypes =  {
    phoneNumber: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      code: null,
      error: false,
    }
  }

  setCode = (code) => {
    this.setState({
      code,
    });
  }

  onVerifySuccess = (responseData) => {
	  if ( typeof responseData.token !== 'undefined' )
		{
            setTimeout(()=>
                    Actions.home({ type: ActionConst.RESET}),
                    500)		}
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
          <View style={smsCodeStyle.container}>

            <View style={smsCodeStyle.textContainer}>
              	<Text style={[theme.textWhiteBold, smsCodeStyle.textCenter]}>
                	We sent you a code by SMS to
					{'\n' + this.props.phoneNumber}
				</Text>
            </View>

            <View style={smsCodeStyle.inputGroupContainer}>
              	<View style={smsCodeStyle.inputContainer}>
                	<Input
                		setStateInputValue={this.setCode}
                		keyboardType="numeric"
                	/>
				</View>

				<View style={smsCodeStyle.errorContainer}>
                	{ this.state.error &&
						<Text style={smsCodeStyle.textError}>
							Wrong code !
						</Text>
                	}
				</View>
            </View>

            <View style={smsCodeStyle.iconContainer}>
              	<TouchableOpacity
                	onPress={
						() => {
							if (this.state.sendingData)
							{
								return;
							}

							if (this.state.code  == "" || this.state.code == null )
							{
								this.setState({ error: true });
	            			}
	            			else
	            			{
	                			this.setState({ sendingData : true });

								var structToSend = {
									  smsCode 	  : this.state.code,
                                      phoneNumber : this.props.phoneNumber,
                                      userId	  : this.props.userId // Temporary...
	   						    };

								protectedPost(
									WS_SMS_VERIFY_CODE,
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
						style={smsCodeStyle.validateIcon}
						source={
							require('../../../assets/icons/validation.png')
              			}
			  		/>
		  		}
		  		{ this.state.sendingData &&
                    <Spinner
                        style={smsCodeStyle.validateIcon}
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
const smsCodeStyle = StyleSheet.create({
  container: {
    height: 			deviceHeight/2.8,
    width: 				deviceWidth,
    flexDirection: 		'column',
    justifyContent: 	'center',
    alignItems: 		'center',
    marginTop:			deviceHeight/4.5,
  },
  textContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textCenter: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  inputGroupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 6,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  textError: {
    color: 'red',
    fontSize: 11,
    backgroundColor: 'transparent',
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
