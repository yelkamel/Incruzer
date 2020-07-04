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
import { Actions } from 'react-native-router-flux';

import theme from '../../themes/base-theme';
import styles from './style';
import { me } from '../../dummyData';
import pushNotificationsList from '../../pushNotificationsSettings';

export default class PushNotifications extends Component {
  
  static porpTypes =  {
    username: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      switchsList: [],
    }
  }

  componentWillMount() {
    return pushNotificationsList.map(
      (notification, key) => {

        this.setState(prevState => ({
          switchsList: [...prevState.switchsList, false],
        }));
      }
    );
  }

  getSwitchIn() {
    return(
      <Image 
        source={require('../../../assets/icons/switchin.png')}
        style={{ width: 46, height: 23, resizeMode: 'contain'}}
      />
    );
  }

  getSwitchOut() {
    return(
      <Image 
        source={require('../../../assets/icons/switchout.png')}
        style={{ width: 46, height: 23, resizeMode: 'contain'}} 
      />
    );
  }

  getSwitch(key) {
    let switchsList = this.state.switchsList;
    if (switchsList[key] === true) {
      return(
        <TouchableOpacity
          opacity={1}
          onPress={() => {
            switchsList[key] = false;
            this.setState({ switchsList });
          }}
        >
          {this.getSwitchIn()}
        </TouchableOpacity>  
      );
    }
    return(
      <TouchableOpacity
        opacity={1}
        onPress={() => {
          switchsList[key] = true;
          this.setState({ switchsList });
        }}
      >
        {this.getSwitchOut()}
      </TouchableOpacity>
    );
  }

  pushNotification() {
    return pushNotificationsList.map(
      (notification, key) => (
        <View style={pushNotificationsStyle.row} key={key}>
          <Text style={[theme.textBlackBold, { marginRight: 20 }]}>
            {notification.label}
          </Text>
          {this.getSwitch(key)}
        </View>
      )
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={pushNotificationsStyle.headerContainer}>
          <View style={pushNotificationsStyle.blockLeft}>
            <TouchableOpacity onPress={() => Actions.pop()} >
              <Image
                source={require('../../../assets/icons/arrow-left.png')}
                style={[theme.icon, { tintColor: '#FFFFFF' }]}
              />
            </TouchableOpacity>
          </View>
          <View style={pushNotificationsStyle.blockCenter}>
            <Text style={theme.titleWhite}>Push Notifications</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <View style={pushNotificationsStyle.bodyContainer}>
          <View style={pushNotificationsStyle.textContainer}>
            <Text style={theme.textBlack}>Be notified when:</Text>
          </View>
          <View style={pushNotificationsStyle.pushNotificationsList}>
            {this.pushNotification()}
          </View>
        </View>
      </View>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const pushNotificationsStyle = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'gray',
    height: deviceHeight/8,
    flexDirection: 'row',
  },
  blockLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 5,
  },
  blockCenter: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    width: deviceWidth,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    flex: 4,
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
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  validateIcon: {
    height: 60,
    width: 60,
  },
  pushNotificationsList: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    height: deviceHeight/12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
