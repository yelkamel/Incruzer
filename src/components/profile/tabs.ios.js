import React, { Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  PanResponder,
} from "react-native";
import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import _ from 'lodash';
import moments from '../../dummyData';

const { height: deviceHeight} = Dimensions.get("window");

import { closeModal } from '../../actions/profile';
import styles from './style';
import Header from './header';
import Tab from './tab';

class Tabs extends React.Component {

  constructor(props){
    super (props);

    this.state = {
      offset: new Animated.ValueXY({x: 0, y: -deviceHeight}),
      isLoaded: false,
    };
    //this.closeModal = this.closeModal.bind(this);
    //this.goToMaps = this.goToMaps.bind(this);
  }

  componentWillMount() {
    this.state.offset.y.addListener((value) => this._animatedValueY = value.value);

    this._panResponder = PanResponder.create({ 
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this.state.offset.setOffset({y: this._animatedValueY});
        this.state.offset.setValue({y: 0});
      },
      onPanResponderMove: Animated.event([
        null, {dy: this.state.offset.y},
      ]),
      onPanResponderRelease: (e: Object, gestureState: Object) => {

        if(gestureState.dy < -30){
          this.animate();
        }
        else if(gestureState.dy > 30)
        {
          this.closeModal();
        }
      }, 
    });
  }

  componentWillUnmount() {
    this.state.offset.y.removeAllListeners();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoaded: true});
      this.animate();
    }, 2000);
  }
  
  animate = () => {

    Animated.timing(this.state.offset, {
      duration: 350,
      toValue: 0
    }).start();

  }

  closeModal = () => {
    Actions.pop();
    this.props.closeModal();
  }
  
  goToMaps = (location) =>  {
    Actions.pop({popNum: 2});
    
    setTimeout(() => {
      Actions.home({location});
    }, 500);
  }

  getUserNbrMoments() {
    let userId = this.props.user.id;
    let data = _.countBy(moments, moment => {
      return moment.user.id  == userId ? 'tabMomentslength': 'others';
    });
    return data.tabMomentslength;
  }


  render(){
    const user = this.props.user;
    return (
      <View 
        style={[styles.container,
          {
            backgroundColor:"rgba(52,52,52,0.5)",
            zIndex: 10,
          }
        ]}
      >
        {
          !this.state.isLoaded
          ?
          <View 
            style={[
              styles.container,
              {
                justifyContent: 'center',
                alignItems: 'center'
              }
            ]}
          >
            <ActivityIndicator
              color={'white'}
              animating={!this.state.isLoaded}
            />
          </View>
          :
          <Animated.View 
            style={[
              styles.container,
              {transform: [{translateY: this.state.offset.y}]}
            ]}
          >
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.modalContainer}>
                <TouchableOpacity 
                  style={styles.overlay}
                  onPress={() => this.closeModal()}
                >
                  <View />
                </TouchableOpacity>

                <View
                  style={{flex: 1}}
                  {...this._panResponder.panHandlers}
                >
                  <Header 
                    blockBottom={false} 
                    user={user} 
                    closeModal={this.closeModal}
                  />
                </View>
                <View style={[
                    styles.content,
                    { flex: 4, }
                  ]}
                >
                  <Tab 
                    user={user}
                    nbrMoments={this.getUserNbrMoments()}
                    goToMaps={this.goToMaps}
                  />
                </View>
              </View>
            </View>
          </Animated.View>
        }
      </View>
      
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal(true)),
});

export default connect(null, mapDispatchToProps)(Tabs);
