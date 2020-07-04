'use strict';

import React, { Component } from 'react';

import { Animated, Text, View, Image, TouchableOpacity, ListView, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { me } from '../../dummyData';

import theme from '../../themes/base-theme';
import styles from './style';

const listActions = [
  {
    'label': 'User Name',
    action: () => Actions.user(),
  },
  {
    'label': 'Push Notification',
    action: () => Actions.pushNotifications(),
  },
  {
    'label': 'Get  in touch',
    action: () => Actions.user(),
  },
  {
    'label': 'Term of Using',
    action: () => Actions.user(),
  },
  {
    'label': 'Confidentiality policy',
    action: () => Actions.user(),
  },
  {
    'label': 'Diconnection',
    action: () => Actions.user(),
  }
];

export default class Setting extends Component {

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(listActions)
    };
  }


  render() {
    return(
      <View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => Actions.pop()}
            >
              <Image
                source={require('../../../assets/icons/arrow-left.png')}
                style={theme.icon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Setting</Text>
        </View>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(setting) => (<TouchableOpacity
                style={styles.row}
                onPress={setting.action}
              >

                <Text style={styles.label}>{setting.label}</Text>
                <Image
                  source={require('../../../assets/icons/next.png')}
                  style={theme.icon}
                />
                
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}