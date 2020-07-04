
import React, { Component, PropTypes, } from 'react';
import { Image,  View, Text, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { colors, images, metrics, appStyle } from '../../../themes'
import styles from './style';

const deviceWidth = Dimensions.get('window').width;


class Header extends Component {
  constructor (props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.transition = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, ((deviceWidth/3 - (deviceWidth/6)))]
    })
    this.state = {
      mode: 'following',
      transitionMode: {left: this.transition},
      selected:{
        world: {},
        following: styles.selected,
      }
    }
  }


  animate = (mode) => {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 200,
      }
    ).start(() => this.setMode(mode))
  }

  setMode = (mode) => {

    this.setState({mode, selected:{
      world: mode ==='world' ? styles.selected : {},
      following: mode ==='following' ? styles.selected : {},
    }})
  }

  transitionMode = (mode) => {

    const transitionMode =
    (mode === 'world') ?
    {left: this.transition} :
    {right: this.transition};

	this.props.onSwitchView(mode);
    this.setState({transitionMode});
    this.animate(mode);
  }

  renderNumber = (mode) => {
    return (
      this.state.mode !== mode ?
        <View style={[styles.numberContainer, {borderRadius: 8, backgroundColor: colors.rougeNotif}]}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={styles.number}>+4</Text>
            </View>
        </View>
        :
        null
    )
  }

  renderMode = () => {
    return (
      <View style={styles.modeContainer}>
        <Animated.View
          style={[
            this.state.transitionMode,
            styles.buttonContainer,
          ]}
        >
          <Image
            style={styles.button}
            source={require('../../../../assets/icons/circleWithBackground.png')}
          />
        </Animated.View>
        <TouchableOpacity
          onPress={() => this.transitionMode('following')}
          style={[styles.buttonContainer, styles.left]}>
          <Image
            style={[
              styles.iconFollowing,
              this.state.selected.following
            ]}
            source={images.friends}
          />
          {this.renderNumber('following')}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.transitionMode('world')}
          style={[styles.buttonContainer, styles.right]}
        >
          <Image
            style={[
              styles.iconMode,
              this.state.selected.world
            ]}
            source={require('../../../../assets/icons/world.png')}
          />
          {this.renderNumber('world')}
        </TouchableOpacity>
      </View>
    )
  }

  render(){
    const {moment} = this.props;
    return (
      <View style={styles.headerContainer}>

        {this.renderMode()}

		{ typeof this.props.moment !== "undefined" &&
			<View style={styles.imageContainer}>
				<TouchableOpacity onPress={() => this.props.goMoments(this.props.moment.id)}>
					<Image
						style={styles.image}
						source={{uri: moment.image}}
					/>
				</TouchableOpacity>
			</View>
		}

        {
                <TouchableOpacity
                  onPress={() => this.props.openFriendListModal()}
                  style={[styles.buttonContainer, styles.right]}
                >
                  <Image
                    style={[
                      styles.iconMode
                    ]}
                    source={images.addFriends}
                  />
                </TouchableOpacity>
        }
      </View>
    )
  }
}

Header.propTypes = {
  moment: PropTypes.object
}

export default Header;
