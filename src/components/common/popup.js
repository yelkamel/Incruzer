import React from 'react';
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

const { height: deviceHeight, width: deviceWidth} = Dimensions.get("window");

export default class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: new Animated.Value(-deviceHeight),
      isLoaded: false,
    };
  }

  static propTypes = {
    percent: React.PropTypes.number.isRequired,
    close: React.PropTypes.func.isRequired,
    percentHeight: React.PropTypes.number,
  };

  static defaultProps = {
    percent: 0.66
  };

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 350,
      toValue: 0
    }).start(
      this.setState({isLoaded: true})
    );
    
  }

  render() {
    const { percent, percentHeight, style } = this.props;
    return (
      <View style={[
          styles.container, 
          {
            backgroundColor: 'rgba(38, 27, 19, 0.5)'
          }
        ]}
      >
        <TouchableHighlight 
          style={[styles.container, {width: deviceWidth, height: deviceHeight}]}
          onPress={() => this.props.close()}
        >
          <View />
        </TouchableHighlight>
        <Animated.View 
          style={[
            {
              width: deviceWidth*percent,
              height: deviceHeight * (percentHeight ? percentHeight : percent),
              top: (deviceHeight - deviceHeight * (percentHeight ? percentHeight : percent))/2,
              left: (deviceWidth - deviceWidth*percent)/2,
              position: 'absolute',
            },
            {transform: [{translateY: this.state.offset}]},
            
          ]}
        >
          { this.state.isLoaded &&  this.props.children }
          <ActivityIndicator color={'white'} animating={!this.state.isLoaded} />
        </Animated.View>
      </View>
      
    );
  }
};


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top:0,
    bottom:0,
    left:0,
    right:0
  },
});

