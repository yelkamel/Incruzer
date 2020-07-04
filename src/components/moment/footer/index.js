'use strict';

import React, { Component } from 'react';

import { Image, Dimensions, Text, View , TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import moment from 'moment';
import Modal from 'react-native-modalbox';
import theme from './../../../themes/base-theme';
import styles from './style';
import { __checkLiveMoment } from '../../../helpers';


class MomentFooter extends Component {

  static propTypes = {
    moment: React.PropTypes.object,
    image: React.PropTypes.string,

  }


  constructor(props) {
    super(props);

  }

  getFooterColorByMomentType = (date) => {
    if (__checkLiveMoment(date)) {
      return {
        backgroundColor: { backgroundColor: 'transparent' },
        textSwipeTagsColor: { color: '#FFF' },
        textAddTagsColor: { color: '#FFF' },
        borderAddTagsColor: { borderColor: '#FFF' },
        editIconTintColor: { tintColor: '#FFF', marginTop: 10, resizeMode: 'cover' }
      };
    }
    return {
      backgroundColor: { backgroundColor: 'transparent' },
      textSwipeTagsColor: { color: '#000' },
      textAddTagsColor: { color: '#000' },
      borderAddTagsColor: { borderColor: '#000' },
      editIconTintColor: { tintColor: '#000', marginTop: 10, resizeMode: 'cover' }
    };
  };

  render() {
    const { user, tagsCount, date, addTag } = this.props;
    const {
      backgroundColor,
      textSwipeTagsColor,
      textAddTagsColor,
      borderAddTagsColor,
      editIconTintColor,
    } = this.getFooterColorByMomentType(date);
    return (
      <View style={[ backgroundColor, styles.footer ]}>
        <View style={styles.blokLeft}>
          <TouchableOpacity
            onPress={() => this.props.showHachTag()}
          >
            <Text
              style={[
                styles.swipeTags,
                textSwipeTagsColor
              ]}
            >
              Swipe up to see {tagsCount} tags
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.blokRight}
        >
          <TouchableOpacity onPress={() => this.props.addNewTagStep()}>
            <Image
              style={[theme.validation, editIconTintColor]}
              source={
                require('../../../../assets/icons/addHashtag.png')
              }
            />
          </TouchableOpacity>

        </View>

      </View>
    );

  }
}

export default MomentFooter;
