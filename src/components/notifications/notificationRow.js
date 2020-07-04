import React, { Component } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions 
} 
from 'react-native';
import { Actions } from "react-native-router-flux";
import moment from 'moment';

import theme from '../../themes/base-theme';
import UserIcon from '../common/UserIcon';

export default class User extends Component {
  
  static porpTypes =  {
    detail: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  renderMessage = (type) => {
    if(type === 'tag'){
      return 'tagged your cruise !';
    }
    else if(type === 'follow'){
      return 'Follows you';
    }
    else if(type === 'nearby'){
      return 'is cruising nearby';
    }
    else if(type === 'cruising'){
      return 'is cruising';
    }
    else if(type === 'welcome'){
      return '';
    }
  }
  
  renderTitle(notification) {
    return notification.user && notification.user.name ||
      notification.type==='welcome' && 'Welcome !' ||
      notification.type==='add' && 'AddFriends';
  }

  renderImage(notification){
    return notification.user ?
    <UserIcon 
      user={notification.user} 
      stylesPremiumName={'mediumWhitePremiumIconStyle'}
    />
    :
    <Image 
      style={theme.iconLogo} 
      source={
        notification.type === 'welcome' ?
        require('../../../assets/logos/logo.png')
        :
        require('../../../assets/logos/addfriends.png')
      }
    />
  }

  render() {
    const { notification } = this.props;
    return(
      <View style={notificationStyle.container}>
        <View style={notificationStyle.leftContainer}>
          <View style={notificationStyle.imageContainer}>
            <TouchableOpacity 
              style={notificationStyle.backgroundImage}
              onPress={this.props.onPress}
            >
              {this.renderImage(notification)}
              
              {
                notification.unread &&
                <View style={{
                  width: 16,
                  height: 16,
                  position: 'absolute',
                  backgroundColor: theme.red,
                  borderRadius: 8,
                  borderColor: 'white',
                  borderWidth: 1,
                  right: 0,
                  top: (80-16)/2
                }} />
              }
            </TouchableOpacity>
          </View>
          <View 
            style={notificationStyle.messageContainer}
          >
            <View
              style={notificationStyle.textContainer}
            >
              <Text
                style={[
                  theme.textWhiteBold,
                  notificationStyle.username
                ]}
              >
                {this.renderTitle(notification)}
              </Text>
              <Text
                style={[theme.text, notificationStyle.text]}
              >
                {this.renderMessage(notification.type)}
              </Text>
            </View>
            <View
              style={notificationStyle.textContainer}
            >
              <Text
                style={[theme.text, notificationStyle.date]}
              >
                { 
                  notification.date &&
                  moment(notification.date).startOf('minute').fromNow()
                }
              </Text>
            </View>
          </View>
        </View> 
      </View>
    );
  }
}

const notificationStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  messageContainer: {
    flex: 2,
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  username: {
    fontSize: 18,
    backgroundColor: 'transparent',
    color: 'black',
    paddingRight: 2,
  },
  text:{

  },
  date: {
    color: 'gray',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    width: 80,
    height: 80,
  },
  rightContainer: {
    flex: 1,
  },
});