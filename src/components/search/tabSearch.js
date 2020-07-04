'use strict';

import React, { Component } from 'react';

import {
  Text, 
  View,
  ScrollView,
  RefreshControl,
  Image, 
  TouchableOpacity, 
  Dimensions, 
  TextInput,
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import HachTags from './hachTags';
import UserIcon from '../common/UserIcon';
import Background from '../common/background';
import theme from '../../themes/base-theme';
import Search from '../common/search';
import styles from './style';

import { me, usersList, hachTags } from '../../dummyData';

const deviceHeight = Dimensions.get('window').height;
const deviceWidh = Dimensions.get('window').width;

export default class TabSearch extends React.Component {
  
  static propTypes = {
    textSearch: React.PropTypes.string,
  };

  static defaultProps = {
    textSearch: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      hachTags,
      usersList,
      index: 1,
      textSearch: props.textSearch,
    };
  }
  
  componentWillMount(){
    this.filter(this.state.textSearch);
  }

  filter = (textSearch) => {
    
    const searchHashtag = hachTags.filter(hachtag => 
      hachtag.toLowerCase().includes(textSearch.toLowerCase())
    );
    const searchUsersList = usersList.filter(user => 
      user.name.toLowerCase().includes(textSearch.toLowerCase())
    );
    
    this.setState({
      textSearch: textSearch,
      hachTags: searchHashtag,
      usersList: searchUsersList,
      displayLoader: false,
    })
  }

  getStyleDisplayUserPictureByUserType(user) {
    return <UserIcon 
      stylesPremiumName={'smallBlackPremiumIconStyle'}
      user={user} />;
  }

  getUser(user, key) {
    return(
      <View key={key} style={styles.userLine}>
        <View style={styles.userLineLeftContent}>
          <View style={styles.justifyVerticalContent}>
            { this.getStyleDisplayUserPictureByUserType(user) }
          </View>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text>{user.name}</Text>
            <Text>{user.snapshot}</Text>
          </View>  
        </View>
      </View>
    );
  }

  getUsers() {
    return this.state.usersList.map(
      (user, key) => this.getUser(user, key)
    );
  }

  setIndex = (flag) => {
    this.setState({ index: flag });
  }

  handleScroll = (event: Object) => {
    this.setState({ displayLoader: true }, () => {
      setTimeout(() => this.setState({ displayLoader: false }), 3000);
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{
            height: deviceHeight/5,
            width: deviceWidh,
          }}
        >
          <Background horizontal={true}>
            <Search
              textSearch={this.state.textSearch}
              filter={ (textSearch) => this.filter(textSearch) }
              left={
                <TouchableOpacity
                  style={styles.blockContainer}
                  onPress={() => Actions.pop()}
                >
                  <Image
                    source={require('../../../assets/logos/addfriends.png')}
                    style={theme.iconLogoSmall}
                  />
                </TouchableOpacity>
              }
              right={
                <TouchableOpacity
                  style={styles.blockContainer}
                  onPress={() => Actions.pop()}
                >
                  <Text
                    style={{
                      color: 'white',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              }
            />
            <View
              style={{
                flex: 1, 
                flexDirection: 'row',
              }}
            >
              <View style={{ flex: 1 }} />
              <View style={styles.tabItemsContainer}>
                <TouchableOpacity
                  onPress={() => this.setIndex(1)}
                >
                  <Image 
                    source={require('../../../assets/icons/hashtag.png')}
                    style={[
                      styles.iconItem,
                      this.state.index === 2 ? styles.iconGrey : {}
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setIndex(2)}
                >
                  <Image 
                    source={require('../../../assets/icons/hashtag.png')}
                    style={[
                      styles.iconItem,
                      this.state.index === 1 ? styles.iconGrey : {}
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }} />
            </View>
          </Background>
        </View>
        { this.state.displayLoader &&
              <Image
                source={require('../../../assets/icons/loading.gif')}
              />
        }
        <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={ Platform.OS === 'ios' && this.state.displayLoader}
                  onRefresh={this.handleScroll}
                  tintColor={'transparent'}
                />
              }
            >
        {
          this.state.index === 1
          ?
          <View style={{ flex: 1, paddingHorizontal: 20 }}>
            {this.getUsers()}
          </View>
          :
          <HachTags 
            lastHours={false} 
            hachTags={this.state.hachTags}
          />
        }
        </ScrollView>
      </View>
    )
  }
};