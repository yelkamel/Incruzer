import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet , Dimensions  } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height: deviceHeight } = Dimensions.get("window");

class Background extends Component {
  static propTypes = {
    horizontal: PropTypes.bool,
    showBorder: PropTypes.bool,
    top: PropTypes.bool,
  };

  static defaultProps ={
    horizontal: false,
    showBorder: false,
    top: false
  };

  render() {
    const { showBorder, horizontal, top } = this.props;


    return (
        <View style={[styles.linearGradientContainer, this.props.style, {backgroundColor: '#FDE459'}]}>
                {this.props.children}
        </View>

    )

    return(
      <LinearGradient
        colors={['#FFEA5E', '#FF5500']}
        start={{x:0, y:0}}
        end={
          	horizontal ?
          	{x:1, y:0}
	        :
	        {x:0, y:1}
        }
        style={[styles.linearGradientContainer, this.props.style]}
      >
        {this.props.children}
        {
          showBorder &&

          <View style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              height: 25,
              zIndex: 0
            },
            top ? {top: 0}: {bottom: 0}
          ]}
          >
            <LinearGradient
              colors={['#FFEA5E', '#FF5500']}
              start={{x:0, y:0}}
              end={
                horizontal ?
                {x:1, y:0}
                :
                {x:0, y:1}
              }
              style={{height: 25, flex: 1}}
            />

          </View>
        }
      </LinearGradient>
    );
  }
}

export default Background;

const styles = StyleSheet.create({
  linearGradientContainer: {
    flex: 1,
    flexDirection: 'column',
  },
});
