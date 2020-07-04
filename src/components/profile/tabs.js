import React, { Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
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
      offset: new Animated.Value(-deviceHeight),
      isLoaded: false,
    };
    this.closeModal = this.closeModal.bind(this);
    //this.goToMaps = this.goToMaps.bind(this);
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

  closeModal() {
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
          {backgroundColor:"rgba(52,52,52,0.5)"}
        ]}
      >
        <View style={{flex: 1}} />
        {
          !this.state.isLoaded
          ?
          <ActivityIndicator
            color={'white'}
            animating={!this.state.isLoaded}
          />
          :
          <Animated.View 
            style={[
              styles.container,
              {transform: [{translateY: this.state.offset}]}
            ]}
          >
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.modalContainer}>
                <Header blockBottom={false} user={user} closeModal={this.closeModal}/>
                <View style={{flex: 4}}>
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
        <View style={{flex: 1}} />
      </View>
      
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal(true)),
});

export default connect(null, mapDispatchToProps)(Tabs);
