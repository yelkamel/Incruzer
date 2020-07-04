/* @flow */

import React, { Component } from 'react';
import { Animated, View, Platform, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { TabViewAnimated } from 'react-native-tab-view';
import TabViewPagerScroll from './TabViewPagerScroll';
import store from 'react-native-simple-store';
import ItemTag, { ItemEmpty } from './itemTag';
import styles from './style';
import theme from '../../themes/base-theme';
const closeImage = require('../../../assets/icons/closeWithCircle.png');

export default class Tag extends Component {

  static title = 'No animation';
  static backgroundColor = '#f4f4f4';
  static tintColor = '#222';
  static appbarElevation = 4;

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    index: 0,
    routes: [],
    //isLoading: true,
    displayHeaderTag: false
  };

  componentWillMount(){

//    store.get('localTags')
//      .then((value) => {

    let routes = this.props.tags.map((tag, key) => {
//        if (tag.momentId == this.props.momentId){
            return { key: String(key + 1), tag }
//        }
    });
    routes.unshift({ key: '0'});
    this.setState({
        routes: routes,
//        isLoading: false
     });
//    })
   }

  _handleChangeTab = (index) => {

    const show = (index == 0 || index == (this.props.tags.length+1));

    this.props.showComponent(show);
    this.setState({
      index,
      displayHeaderTag: !show
    });

  };

  close = () => {
    this.setState({close: true, index: 0, displayHeaderTag: false});
    this.props.showComponent(true);
  };


  _renderScene = ({ route }) => {

    if ( route.tag ) {
       return <ItemTag hideTags={() => this.close()} tag={route.tag}  key={route.key} />
    }

    return <ItemEmpty />;
  };

  _renderPager = (props) => {
    return (
      <TabViewPagerScroll
        {...props}
      />
    );
  };

  renderHeader()  {
    return ( this.state.displayHeaderTag &&
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Swipe up to see next tag</Text>
      </View>
    )
  }

  renderFooter() {
    return ( this.state.displayHeaderTag &&
      <TouchableOpacity
        onPress={() => this.close()}
        style={{
          position: 'absolute',
          bottom: 50,
          left: 30,
        }}
      >
        <Image
          source={closeImage}
          style={theme.iconClose}
        />
      </TouchableOpacity>
    )
  }

  _configureTransition = () => null;

  render() {


    return (
      <View style={styles.container} >
        {this.renderHeader()}
        <TabViewAnimated
          style={[ styles.container, this.props.style ]}
          navigationState={this.state}
          configureTransition={this._configureTransition}
          renderPager={this._renderPager}
          renderScene={this._renderScene}
          onRequestChangeTab={this._handleChangeTab}
        />
        { this.renderFooter()}


      </View>

    );
  }
}
