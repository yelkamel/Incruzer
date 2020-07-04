import React, { PropTypes } from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity, Platform } from 'react-native';

import styles from './style';
import Footer from './footer';
import theme from '../../../themes/base-theme';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const closeImage = require('../../../../assets/icons/closeWithCircle.png');
import { __checkLiveMoment, displayMomentType } from '../../../helpers';

const Item = ({ tag, hideTags }) => {

  return (
    <View style={styles.slide}>
      <Text style={[styles.text,
        {
          transform: [{rotate: tag.rotate}],
          color: (tag.color != null || tag.color != "0") ? tag.color : "orange",
          fontSize: (tag.size != null || tag.size != 0) ? tag.size : 12,
          top: tag.top,//(deviceHeight/2)* tag.top,
          left: tag.left,//deviceWidth* tag.left,
        }
      ]}>
        {tag.comment}
      </Text>
      <Footer hideTags={hideTags} tag={tag} />
    </View>
  )
};

export const ItemEmpty = () => (
  <View style={styles.slide}></View>
);

export default Item;
