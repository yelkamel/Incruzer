import FBSDK from 'react-native-fbsdk';
import React, { Component } from 'react';
import { unprotectedPost } from '../../wsFetch';
import { WS_REGISTER } 	 from '../../constants';
import { View, Text } from 'react-native';
import {Actions,ActionConst}from 'react-native-router-flux';

const {
  LoginButton,
  AccessToken
} = FBSDK;


export default class FbConnexion extends Component {

  constructor(props) {
    super(props);
  }

 onVerifySuccess = (responseData) => {

       if ( typeof responseData.token !== 'undefined' )
       {
          /*
           console.log("Json :", responseData);
           AsyncStorage.setItem("userToken", 		responseData.token);
           AsyncStorage.setItem("refreshToken", 	responseData.refreshToken);
           AsyncStorage.setItem("userId", 			responseData.userId);
           setTimeout(()=>
                   Actions.home({ type: ActionConst.RESET}),
                   500)
          */
       }
       else
       {
           console.log("Error");
       }

 }

 onVerifyFail = (responseData) => {
     console.error(error);
 }

  render() {

    return(<LoginButton
              publishPermissions={["publish_actions","email","user_friends"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    //alert("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    //alert("login is cancelled.");
                  } else {

                      AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        Actions.home({ type: ActionConst.RESET})
                      })
                  }
                }
              }
              onLogoutFinished={() => {}}/>)
  }
}
