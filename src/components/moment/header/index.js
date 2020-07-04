'use strict';

import React, { Component } from 'react';
import { Image, Dimensions, View ,Text, TouchableOpacity, Animated } from 'react-native';
import { connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { __checkLiveMoment, displayMomentType } from '../../../helpers';
import UserIcon from '../../common/UserIcon';
import theme from '../../../themes/base-theme';
import styles from './style';

const closeImage = require('../../../../assets/icons/x.png');

class MomentHeader extends Component {

  static propTypes = {
    moment: React.PropTypes.object,
    isMe: React.PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      opacity		: new Animated.Value(1),
      textOpacity	: 1,
      dateTimer		: false,
    };
  }

  dipslayTypeMoment = (date) => {
	  var $this = this;
	  if ( this.state.dateTimer == false )
	  {
		this.state.dateTimer = setInterval(function()
	    {
		  if( $this.state.textOpacity == 0 )
		  {
				$this.setState({ textOpacity: 1 });
		  }
		  else
		  {
		  		$this.setState({ textOpacity: 0 });
		  }
		}, 1000);
	  }

	if (__checkLiveMoment(date)) {
      return displayMomentType(date) ;
    }
    return 'Flashback';
  }

  componentWillUnmount(){
  	  if ( this.state.dateTimer != false )
      {
	      clearInterval(this.state.dateTimer);
	  }
  }

  getStyleDisplayUserPictureByUserType = (user, momentDuration, momentTimerStart) => {

  	  return (<UserIcon
      	  user={user}
	  	  displayProIcon={false}
	  	  stylesPremiumName={'mediumWhitePremiumIconStyle'}
	  	  withTimer={true}
	  	  momentDuration={momentDuration}
	  	  momentTimerStart={momentTimerStart}
	  />)
  }

  goToProfile = (user) => {
	  this.props.isModalVisible();
	  Actions.profile({user});
  }

  animatedOpacity = (value) => {
    Animated.timing(
      this.state.opacity,
      {
        toValue: value,
        duration: 1000,
      }
    ).start();
  }

  displayCountry(address)
  {
	var country = "";

    if (address.country != "" && address.country !== undefined )
    {
	    country = address.country + ", ";
    }
    return country;
  }


  componentDidUpdate(nextProps) {
	  if( this.props.momentDuration === false && nextProps.momentDuration !== false )
	  {
		  //console.log("Triggering state change for duration !");
	  }
	  else
	  {
		  //console.log("Nothing to do bro'.");
	  }
  }


  render() {
  	const { user, date, address, isModalVisible, momentDuration, momentTimerStart } = this.props;

  	const opacity = this.state.opacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    });

    //console.log("Moment header : " + momentDuration);

    return (
      <View style={styles.header} >
        <View style={styles.blokLeft}>

          <Animated.View
          	style={[
            	{
				opacity,
				paddingTop: 5
            	}
			]}
		  >
          	<TouchableOpacity
            	onPress={()=> !this.props.isMe ? this.goToProfile(user) : {}}
			>
            	{this.getStyleDisplayUserPictureByUserType(user, momentDuration, momentTimerStart)}
			</TouchableOpacity>
		  </Animated.View>

          <View style={styles.textContent}>

            <View style={{ flexDirection: 'row' }}>

              <Text style={ styles.text } onPress={()=> !this.props.isMe ? this.goToProfile(user) : {}}>
                { user.name }
              </Text>

              { user.type === 1 &&
                <Image
                  source={require('../../../../assets/icons/pro.png')}
                  style={styles.iconPro}
                />
              }

            </View>

            	<Text style={[styles.textNote, { opacity: this.state.textOpacity } ]} onPress={()=> !this.props.isMe ? this.goToProfile(user) : {}}>
              		{this.dipslayTypeMoment(date)}
			  	</Text>

			  	<TouchableOpacity
			 		onPress={()=> {
                        !this.props.isMe ? Actions.pop({refresh: {
                        location: address.location,
                        isFromMomentAddress: true,
                        isFromClosingMoment: false,
                        previousMomentId: this.props.momentId
                        }
                    }) : {}}}
			 	>

              		<Text style={styles.text}>

                		{this.displayCountry(address)}{address.city}
					</Text>


				</TouchableOpacity>
			</View>

        </View>

        <View style={styles.blokCenter}>
        	<Image
                source={require('../../../../assets/icons/OURS-V1.gif')}
				style={styles.iconBear}
			/>
			<Text style={styles.smallTextIndicator}>
			>
            </Text>

        </View>

        <View style={styles.blokRight}>
          <TouchableOpacity
            onPress={() => Actions.pop({refresh: {
            duration: 0,
            isFromMomentAddress: false,
            isFromClosingMoment: true
            }})}
            style={styles.touchableIconClose}
          >
            <Image
              source={closeImage}
              style={theme.iconClose}
            />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default MomentHeader;
