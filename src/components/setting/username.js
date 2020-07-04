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

import Input from '../common/input';
import theme from '../../themes/base-theme';
import styles from './style';
import { me } from '../../dummyData';

export default class Username extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      error: false,
    }
  }

  setUsername = (username) => {
    this.setState({
      username,
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={usernameStyle.headerContainer}>
          <View style={usernameStyle.blockLeft}>
            <TouchableOpacity onPress={() => Actions.pop()} >
              <Image
                source={require('../../../assets/icons/arrow-left.png')}
                style={[theme.icon, { tintColor: '#FFFFFF' }]}
              />
            </TouchableOpacity>
          </View>
          <View style={usernameStyle.blockCenter}>
            <Text style={theme.textWhiteBold}>User Name</Text>
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <View style={usernameStyle.bodyContainer}>
          <View style={usernameStyle.inputContainer}>
            <Input 
              borderWidth={2}
              borderColor={'black'}
              color={'black'}
              fontSize={14}
              fontWeight={'bold'}
              width={250}
              height={50}
              setStateInputValue={this.setUsername}/>
          </View>
          <View style={usernameStyle.errorContainer}>
            { this.state.error &&
              <Text style={usernameStyle.textError}>
                Already taken !
              </Text>
            }
          </View>
          <View style={usernameStyle.iconContainer}>
            <TouchableOpacity
              onPress={
                () => {
                  if (this.state.username !== me.name) {
                    Actions.pushNotifications();
                  } else {
                    this.setState({ error: true });
                  }
                }
              }
            >
              <Image
                style={[theme.validation, { tintColor: 'black' }]} 
                source={
                  require('../../../assets/icons/validation.png')
                } 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const usernameStyle = StyleSheet.create({
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    height: deviceHeight/2,
    width: deviceWidth,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: deviceHeight/7,
  },

  textContainer: {
    flex: 1,
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
});
