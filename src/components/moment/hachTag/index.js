'use strict';

import React, { Component } from 'react';

import { ScrollView, Text, View , TouchableOpacity, Alert, Image } from 'react-native';

import styles from './style';

class HachTag extends Component {

  static propTypes = {
    tags: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
  }

  report = () => {
    Alert.alert(
      'Info',
      'Signaler Moment',
      [
        {text: 'Signaler un abus', onPress: () => this.confirmReport()},
        {text: 'Anuuler', onPress: () => {}},
      ]
    )
  }

  confirmReport = () => {
    Alert.alert(
      'Info',
      'Tu confirmes que tu souhaites déclarer ce tag en abus ?',
      [
        {text: 'Oui', onPress: () => {}},
        {text: 'Anuuler', onPress: () => {}},
      ]
    )
  }
  render() {
    const { tags } = this.props;

    return (
      <View style={styles.container}>

        <View style={styles.hachTagContainer}>
          <TouchableOpacity
            style={styles.scroll}
            onPress={() => this.props.showHachTag()}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollsToTop={false}
            >
              {
                tags &&
                tags.map((tag, index) => <Text
                    style={styles.text}
                    key={index}
                  >
                      #{tag.comment}
                  </Text>
                )
              }
            </ScrollView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.report}
          >
            <Image
              source={require('../../../../assets/icons/report.png')}
              style={styles.report}
            />
          </TouchableOpacity>
        </View>

      </View>
    );

  }
}

export default HachTag;
