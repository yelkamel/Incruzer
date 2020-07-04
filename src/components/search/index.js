'use strict';

import React, { Component } from 'react';

import { 
  Animated,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';

import { checkPermissions } from '../../helpers';
import HachTags from './hachTags';
import Authorize from '../common/authorizeView';
import Background from '../common/background';
import Search from '../common/search';
import theme from '../../themes/base-theme';

import { hachTags } from '../../dummyData';
import styles from './style';

const deviceHeight = Dimensions.get('window').height;
const deviceWidh = Dimensions.get('window').width;

export default class VideoUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationPermission: false,
      hachTags,
      textSearch: '',
      displayLoader: false,
    };
  }

  async componentWillMount() {
    const response = await checkPermissions(['location']);
    this._updatePermissions(response.location);
  }

  _updatePermissions = (response) => {
    this.setState({ locationPermission: response.location });
  }

  handleScroll = (event: Object) => {
    this.setState({ displayLoader: true }, () => {
      setTimeout(() => this.setState({ displayLoader: false }), 3000);
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
            <View 
              style={{
                height: deviceHeight/12,
                width: deviceWidh,
              }}
            >
              <Background horizontal={true}>
                <Search
                  filter={ (textSearch) => this.setState({ textSearch }) }
                  left={
                    <TouchableOpacity
                      style={styles.blockContainer}
                      onPress={ 
                        () => Actions.tabSearch({
                          textSearch: this.state.textSearch
                        }) 
                      }
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
                      <Image
                        source={require('../../../assets/icons/next.png')}
                        style={[styles.icon]}
                      />
                    </TouchableOpacity>
                  }
                />
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
              this.state.locationPermission !== "authorized" ?
              <View style={{height: deviceHeight*11/24}}>
                <Authorize
                  _updatePermissions={
                    response => { 
                      this.setState({ locationPermission: response }) 
                    }
                  }
                  permission={'location'}
                  message={"Activate the location to see who's Cruising nearby !"}
                />
              </View>
              :
              <View style={{height: deviceHeight*11/24}}>
                <Video
                  source={{
                    uri: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
                  }}
                  style={{ flex: 1, }}
                  muted={ false }
                  resizeMode="cover"
                  paused={ false }
                  repeat={ true } 
                />
                
                <View 
                  style={styles.textContainer}
                >
                  <View>
                    <Text style={styles.text}
                  >
                      Cruising nearby
                    </Text>
                  </View>
                </View>
                
              </View>
            }
            <HachTags hachTags={this.state.hachTags} />
        </ScrollView>
      </View>
    )
  }
};

