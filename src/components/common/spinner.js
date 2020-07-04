
import React, { Component } from 'react';
import { Dimensions, View, Text, Image } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Spinner extends Component {

  static propTypes = {
    backgroundColor: React.PropTypes.string,
    size: React.PropTypes.number,
  };

  static defaultProps = {
    backgroundColor: '#000000',
    size: 70,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={{
        width: deviceWidth,
        height: deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000000"
      }}>
        <Image
          source={require('../../../assets/images/spinner.gif')}
          style={{
            width: this.props.size,
            height: this.props.size,
          }}
        />
      </View>
    )
  }
}

export default Spinner;

