'use strict';

import React, { Component } from 'react';
import { View, Image, Dimensions, Text, StyleSheet, Animated  } from 'react-native';
import { colors, images, metrics, appStyle } from '../../themes'

const premiumPicture = require('../../../assets/icons/pro.png');


class UserIcon extends Component {

  static propTypes = {
    stylesPremiumName: React.PropTypes.string,
    user: React.PropTypes.object,
  };

  state = {
    height: 		new Animated.Value(66),
    momentDuration: false,
  };

  static defaultProps = {
    stylesPremiumName: 'mediumWhitePremiumIconStyle',
    user: {},
    displayProIcon: true,
    withTimer: true
  };

  _getStyleByStylesPremiumName = () => {
    switch(this.props.stylesPremiumName) {
	  case 'bigWhitePremiumIconStyle':
        return bigWhitePremiumIconStyle;
      case 'myAccountWhitePremiumIconStyle':
        return myAccountWhitePremiumIconStyle;
      case 'mediumWhitePremiumIconStyle':
        return mediumWhitePremiumIconStyle;
      case 'smallBlackPremiumIconStyle':
        return smallBlackPremiumIconStyle;
    }
  }

  animate = () => {
	  if( typeof this.props.momentDuration !== "undefined" && this.props.momentDuration !== false )
	  {
		  	var newDuration = parseInt( this.props.momentDuration * 1000 );

		  	console.log("Animating to : " + newDuration);
		  	Animated.timing(this.state.height, {
	      		duration: newDuration,
		  		toValue: 0
	    	}).start();
	  }
	  else
	  {
		  //console.log("MomentDuration is invalid : " + this.props.momentDuration);
	  }

  }

  componentDidUpdate(nextProps) {
	  if( this.props.momentDuration != nextProps.momentDuration && nextProps.momentDuration != false )
	  {
		  //console.log("Setting moment duration from " + this.props.momentDuration + " to " + nextProps.momentDuration + " ...");
		  this.setState({ momentDuration : nextProps.momentDuration })
	  }
	  else
	  {
		  if( this.props.momentTimerStart != nextProps.momentTimerStart )
		  {
			  //console.log("Starting timer ...");
			  this.animate();
		  }
		  //console.log("Tss, same props.");
	  }
  }




  render() {
    const style = this._getStyleByStylesPremiumName();

    var $this = this;

    if (this.props.user.type === 1 && this.props.displayProIcon)
    {
        //	          source={{ uri: this.props.user.picture }}>

		return (
	      <View style={style.premiumIconContainer}>
	        <Image
	          style={style.userPicture}
              source={ (this.props.user.picture != null) ? {uri: this.props.user.picture } : images.profilLambda}>
	        </Image>
	        <Image
	          source={premiumPicture}
	          style={style.picture}
	        />
	        { this.props.withTimer &&
		        <View style={style.timerCircle}>
		        </View>
	        }
	      </View>
	    );
    }
    else
    {
		return (
			<View>
				{ this.props.withTimer &&
						<View style={style.timerCircleContainer}>
							<View style={style.timerCircle}>
							</View>

							<Animated.View style={[style.timerCircleOverlay, { height: this.state.height }]}>
							</Animated.View>
						</View>
				}
				<Image
					style={style.userPicture}
					source={{ uri: this.props.user.picture }}
				/>

			</View>
	    );

    }

  }
}

export default UserIcon;


export const bigWhitePremiumIconStyle = StyleSheet.create({
  premiumIconContainer: {
    width: 100,
    height: 100,
  },
  picture: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: 'transparent',
  },
  userPicture: {
    width: 90,
    height: 90,
    borderRadius: 45,
    position: 'absolute',
    top: 0,
    left: 0,

  },
  proText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

const myAccountWhitePremiumIconStyle = StyleSheet.create({
  premiumIconContainer: {
    width: 80,
    height: 80,
  },
  picture: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: 'transparent',
  },
  userPicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCircleContainer: {
	width: 66,
    height: 66,
    borderRadius: 33,
	position: 'absolute',
    top: -3,
    left: -3,
    overflow: 'hidden',
  },
  timerCircle: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  timerCircleOverlay: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    position: 'absolute',
    top: 0,
    left: 0,
  },
  proText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

const mediumWhitePremiumIconStyle = StyleSheet.create({
  premiumIconContainer: {
    width: 66,
    height: 66,
  },
  picture: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: 'transparent',
  },
  userPicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCircleContainer: {
	width: 66,
    height: 66,
    borderRadius: 33,
	position: 'absolute',
    top: -3,
    left: -3,
    overflow: 'hidden',
  },
  timerCircle: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  timerCircleOverlay: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    position: 'absolute',
    top: 0,
    left: 0,
  },
  proText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

const smallBlackPremiumIconStyle = StyleSheet.create({
  picture: {
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    left: 0,
    backgroundColor: 'transparent',
  },
  userPicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  }
});
