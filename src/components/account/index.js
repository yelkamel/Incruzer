
import React, { Component } from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  View,
  Button,
  Image,
  Text
} from 'react-native';
import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
} from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';


import styles from './style';

const logo = require('../../../assets/images/logo.png');

class Account extends Component {
  
  static propTypes = {

  }

  constructor(props) {
    super(props);
  }

  facebookManager() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        console.log(result.grantedPermissions.toString());
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: data.accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name'
                    }
                  }
                },
                this.storeResponseFacebookData,
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();

            }
          );
          
        }
      },
      function(error) {
        alert('Login fail with error: ' + error);
      }
    );

    // Create a graph request asking for user information with a callback to handle the response.
    
  }
    //Create response callback.
  storeResponseFacebookData(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      AsyncStorage.setItem('Me', result);
      Actions.home();
    }
  }



  render() {
    let _this = this;
    return(
      <View style={styles.container}>
        <View  style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            onPress={ () => null }
            style={[styles.buttonTouchable]}
          >
            <View style={[styles.button, styles.connectionButton]}>
              <Text style={[styles.buttonText, styles.buttonConnectionText]}>
                Connexion
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={ () => this.facebookManager() }
            style={[styles.buttonTouchable]}
          >
            <View style={[styles.button, styles.facebookButton]}>
              <Text style={styles.buttonText}>Inscription rapide avec facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ () => null }
            style={[styles.buttonTouchable]}
          >
            <View style={[styles.button, styles.registerButton]}>
              <Text style={[styles.buttonText]}>
                Inscription rapide avec e-mail
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Account;
