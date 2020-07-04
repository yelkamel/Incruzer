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
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';

const { height: deviceHeight} = Dimensions.get("window");

import { me } 				from '../../dummyData';
import { closeModal } 		from '../../actions/profile';
import styles 				from './style';
import Header 				from './header';
import Content 				from './content';
import { protectedGet }		from '../../wsFetch';
import { WS_USER_STATS }	from '../../constants';

class Profile extends React.Component {
  constructor(props){
    super (props);

    this.state = {
      offset: new Animated.ValueXY({x: 0, y: -deviceHeight}),
      userAlReadyAdded: false,
      isLoaded: false,
    };
  }
  
  onLoadStatsSuccess = (responseData) => {
	  	console.log("ResponseUserStats : ", responseData);
	  	
	  	if( typeof responseData.followers !== "undefined" )
	  	{
		  	this.setState({
				"nbFollowers" : responseData.followers,
				"nbFollowing" : responseData.following	
		  	});
	  	}
  }
  
  onLoadStatsFail = (error) => {
	  	this.setState({
			"nbFollowers" : "N/A",
			"nbFollowing" : "N/A"	
	  	});
		console.error(error);
  }

  componentDidMount() {
    this.props.closeModal();
    
    setTimeout(() => {
      this.setState({isLoaded: true});
      this.animate();
    }, 100);

    this.setState({
      userAlReadyAdded: this.checkUserAlreadyAdded()
    })
  }

  componentWillMount() {
	  	if( typeof this.props.user.id !== "undefined" )
	  	{
		  	var targetUrl = WS_USER_STATS + "/" + this.props.user.id;
		  	
		  	protectedGet(
				targetUrl,
				this.onLoadStatsSuccess,
				this.onLoadStatsFail
			);
	  	}
	  	
	  	console.log("User : ", this.props.user);
	  	
	  	this.state.offset.y.addListener((value) => this._animatedValueY = value.value);

	    this._panResponder = PanResponder.create(
	    { 
	      onStartShouldSetPanResponder: 		() => true,
	      onMoveShouldSetPanResponder: 			() => true,
	      onMoveShouldSetResponderCapture: 		() => true,
	      onMoveShouldSetPanResponderCapture: 	() => true,
	      onPanResponderGrant: (e, gestureState) => 
	      {
	      	  this.state.offset.setOffset({y: this._animatedValueY});
		  	  this.state.offset.setValue({y: 0});
	      },
	      onPanResponderMove: Animated.event([
	            null, {dy: this.state.offset.y},
	      ]),
	      onPanResponderRelease: (e: Object, gestureState: Object) => 
	      {
	
	        if(gestureState.dy < -30)
	        {
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

  animate = () => {

    Animated.timing(this.state.offset, {
      duration: 350,
      toValue: 0
    }).start();

  }
   
  closeModal = () => {
    Animated.timing(this.state.offset, {
      duration: 350,
      toValue: deviceHeight
    }).start(Actions.pop);
  }

  checkUserAlreadyAdded() {
    return me.following.find((following) => {
      return following === this.props.user.id;
    });
  }
  

  openTabModal = () => {
    Actions.tabProfile({
      user: this.props.user,
      goToMaps: this.props.goToMaps
    });
  }

  componentDidUpdate(prevProps) {
    const { close, map } = this.props;
    if (prevProps.close === false && close === true ) {
      this.closeModal();
    }
  }


  render(){
    const user = this.props.user;
    return (
      <View 
        style={[styles.container,
          {
            backgroundColor:"rgba(52,52,52,0.5)",
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
        onPress={() => this.closeModal()}
        onLongPress={() => this.closeModal()}
      >
        {
          !this.state.isLoaded
          ?
          <ActivityIndicator
            color={'white'}
            animating={!this.state.isLoaded}
          />
          :
          <Animated.View style={[{
                flex: 1,
                flexDirection: 'row',
              },
              {transform: 
                [
                  {translateY: this.state.offset.y}
                ]
              }
            ]}
            {...this._panResponder.panHandlers}
          >
            <TouchableOpacity 
              style={[ 
                styles.overlay,
              ]}
              onPress={() => this.closeModal()}
              onLongPress={() => this.closeModal()}
            >
                <View />
            </TouchableOpacity>
            <View style={[
                styles.modalContainer,
                { marginVertical: deviceHeight/4 }
              ]}
            >

              <Header
                closeModal={this.closeModal}
                isfollowing={this.state.userAlReadyAdded}
                openTabModal={this.openTabModal}
                user={user}
              />
              
              <View style={[
                  styles.content,
                  { flex: 3, }
                ]}
              >
                <Content 
                  user={user}
                  isfollowing={this.state.userAlReadyAdded}
                  following={this.state.nbFollowing}
                  followers={this.state.nbFollowers}
                />
              </View>
            </View>
          </Animated.View>
        }
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  close: state.profile.close,
});

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
