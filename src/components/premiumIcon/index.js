'use strict';

import React, { Component } from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { connect} from 'react-redux';

import { 
  bigWhitePremiumIconStyle,
  mediumWhitePremiumIconStyle,
  smallBlackPremiumIconStyle 
} 
from './style';

const premiumPicture = require('../../../assets/icons/pro.png');


class PremiumIcon extends Component {

  static defaultProps = {
    stylesPremiumName: 'mediumWhitePremiumIconStyle',
  }


  constructor(props) {
    super(props);
  }

  _getStyleByStylesPremiumName = () => {
    switch(this.props.stylesPremiumName) {
      case 'bigWhitePremiumIconStyle':
        return bigWhitePremiumIconStyle;
      case 'mediumWhitePremiumIconStyle':
        return mediumWhitePremiumIconStyle;
      case 'smallBlackPremiumIconStyle':
        return smallBlackPremiumIconStyle;
    }
  }


  render() {
    const style = this._getStyleByStylesPremiumName();
    return (
      <View
        style={style.premiumIconContainer}
      >
        <Image 
          style={style.userPicture}
          source={{ uri: this.props.userPicture }}
        />
        <Image
          source={premiumPicture}
          style={style.picture}
        />
      </View>
    );
  }
}

export default connect()(PremiumIcon);
