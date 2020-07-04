import React, { Component } from 'react';
import {Text, Image,LayoutAnimation, View, Dimensions, AsyncStorage} from 'react-native';

import {Actions} 			from 'react-native-router-flux';
import * as Animatable 		from 'react-native-animatable';
import styles 				from './style';
import Background 			from '../common/background';
import { WS_REFRESH_TOKEN, WS_REGISTER }	from '../../constants';
import {
	protectedGet,
	protectedPost,
	unprotectedPost
	}			 			from '../../wsFetch';
import _ from "lodash"


const {height: deviceHeight, width: deviceWidth} = Dimensions.get("window");
import { colors, images, metrics, appStyle } from '../../themes'


export default class SplashPage extends Component {

  constructor () {
    super()
    this.state={
    }
  }


  onSuccessRefreshToken = (responseData) => {
	  console.log("Data : ", responseData);
	  AsyncStorage.setItem("userToken", responseData.token);
	  AsyncStorage.setItem("refreshToken", responseData.refreshToken);
	  Actions.home();
  }


  onVerifyUserSuccess = (responseData) => {
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

  onVerifyUserFail = (responseData) => {
	 this.setState({ sendingData : false });
	 console.error(error);
  }

  onFailRefreshToken = () => {

	  var userRandom = _.random(1, 9999999999)
	  var structToSend = {
			username    : "USER" + userRandom,
			name  	  : "NAME"  + userRandom,
			phoneNumber : "",
	  };

	  unprotectedPost(
		  WS_REGISTER,
		  structToSend,
		  this.onVerifyUserSuccess,
		  this.onVerifyUserFail
	  );
    }

  animateFinish = () => {
    //this.logoView.bounceOutRight(2000)
    //this.logoNameView.bounceOutLeft(2000)

    // Go direct sur la map
    /*
    setTimeout(() => {
	    AsyncStorage.getItem("refreshToken").then((value) =>
		{
			if( value != "" && value != null )
			{
				var structToSend = {
				    "refresh_token" : value
			    }
		        protectedPost(
			        WS_REFRESH_TOKEN,
			        structToSend,
			        this.onSuccessRefreshToken,
					this.onFailRefreshToken
		        );
		  	}
		  	else
		  	{
				this.onFailRefreshToken();
		  	}
		}).done();
    }, 1000)
    */
    setTimeout(() => {
      Actions.home();
    }, 1000)

  }


  componentWillMount() {
    setTimeout(() => { Actions.home(); }, 3000);
  }

  renderLogoNameAnimation (){
    return (
        <Animatable.View
            ref={(c) => this.logoNameView = c}
            style={{
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
              width: deviceWidth*0.8,
              height: deviceHeight*0.2,
            }}
            >
            <Text style={{
                    fontSize: 65,
                    fontFamily: 'Breeze Personal Use',
                }}>
                Incruizer
            </Text>
        </Animatable.View>
    )
  }

  renderLogoAnimation(){
      return (
          <View
              style={{
                width: deviceWidth*0.3,
                height: deviceWidth*0.3,
              }}
              >
              <Image
                source={images.logo}
                style={{
                  width: deviceWidth*0.3,
                  height: deviceWidth*0.3,
                }}
              />
          </View>
      )

  }

  render() {
    return (
      <View style={styles.container} >
        <Background>
          <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
          }}>
		  <Image
			source={images.logo}
			style={{
			  width: deviceWidth*0.3,
			  height: deviceWidth*0.3,
			  bottom: -20,

			}}
		  />
		  <Text style={{
  				fontSize: 70,
				backgroundColor: 'transparent',
  				fontFamily: 'Breeze Personal Use',
  			}}>
  			Incruizer
  		</Text>
          </View>
        </Background>
      </View>
    );
  }
}
