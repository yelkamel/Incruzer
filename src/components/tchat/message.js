import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import moment from 'moment';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");

const Message = ({ text, time, me = false }) => {
  return(
    <View style={
        [
          styles.container,
          me ? styles.sartLeft : styles.startRight
        ]
      }
    >
      <View 
        style={ 
          [
            me ? styles.messageLeftContainer : styles.messageRightContainer,
            styles.messageContainer,
          ]
        }
      >
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.time}>
          {moment(time, 'X').format('HH:mm')}
        </Text>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  sartLeft: {
    justifyContent: 'flex-start',
  },
  startRight: {
    justifyContent: 'flex-end',
  },
  messageContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingTop: 3,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: 'rgb(175, 175, 175)',
  },
  messageLeftContainer: {
    marginLeft: 5,
    backgroundColor: '#FFFFFF',
  },
  messageRightContainer: {
    marginRight: 5,
    backgroundColor: '#FEC3AC',
    flexDirection: 'column',
    borderRadius: 10,
  },
  text: {
    textAlign: 'left',
    color: 'black',
  },
  time: {
    textAlign: 'right',
    color: 'grey',
    fontSize: 11,
  }
});