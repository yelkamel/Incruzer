'use strict';

import React, { Component } from 'react';

import { Animated, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { TabViewAnimated, TabBar, TabViewPagerPan } from 'react-native-tab-view';
import Follow from '../../follow';
import Moments from '../../momentsProfile';
import NoData from './noData';

import styles from './style';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Tab  extends Component {

  static propTypes = {
    nbrMoments: React.PropTypes.number,
  }

  constructor(props){
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: '0', title: 'Cruises', length: this.props.nbrMoments },
        { key: '1', title: 'Followers', length: this.props.user.followers.length },
        { key: '2', title: 'Following', length: this.props.user.following.length },
      ],
    };
  }

  _handleChangeTab = (index) => {
    this.setState({ index });

  };

  _handleTabItemPress = route => {
    this.setState({ index: parseInt(route.key) });
  }

  _renderLabel = (props: any) => ({ route, index }) => {
    return (
      <View style={{flex: 1}}>
        <Text style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 19,
          }}
        >
          {route.length}
        </Text>
        <Text style={{
            color: '#FFFFFF',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 13,
          }}
        >
          {route.title}
        </Text>
      </View>
    );
  }

  _renderPager = (props) => {
      return <TabViewPagerPan 
        {...props}
        swipeEnabled={false} 
      />;
  };

  _configureTransition = () => null;

  _renderHeader = (props) => {
    return <TabBar
     {...props}
      style={{
        backgroundColor: 'transparent',
        height: deviceHeight/10,
        marginBottom: 7
      }}
      pressColor='red'
      renderLabel={this._renderLabel(props)}
      indicatorStyle={{backgroundColor: '#FFFFFF'}}
    />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '0':
      if (route.length)
        return <Moments
          goToMaps={this.props.goToMaps}
          moments={this.props.user.moments}
        />;
      return <NoData text='cruises' />
    case '1':
      if (route.length)
        return <Follow 
          type="FOLLOWERS" 
          user={this.props.user} 
        />;
      return <NoData text='followers' />
    case '2':
      if (route.length)
        return <Follow 
          type="FOLLOWING" 
          user={this.props.user} 
        />;
      return <NoData text='following' />
    default:
      return null;
    }
  }

  render(){
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        handleTabItemPress={this._handleTabItemPress}
        onRequestChangeTab={this._handleChangeTab}
        configureTransition={this._configureTransition}
        renderPager={this._renderPager}
      />

    )
  }
}

export default Tab;
