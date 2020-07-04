import React, { PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';
import styles from './style';
import theme from '../../../themes/base-theme';

const closeImage = require('../../../../assets/icons/x.png');
import { __checkLiveMoment, displayMomentType } from '../../../helpers';

export default ({ tag, hideTags }) => {
  
  const displayDateType = (date) => {
    if (__checkLiveMoment(date)) {
      return displayMomentType(date) ; 
    }
    return 'Flashback';
  }
  return (
    <View style={styles.footer}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          
        </View>
        <View style={styles.userContainer}>
          <Image style={styles.userPicture}
            source={{ uri: tag.user.picture }} 
          />
          <View style={styles.infoContainer}>
            <Text style={styles.userName}>
              {tag.user.name}
            </Text>
            <Text style={styles.textNote}>
              {displayDateType(tag.date)}
            </Text>
          </View>
          
        </View>
      </View>
    </View>
  )
};
