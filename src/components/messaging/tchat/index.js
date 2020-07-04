import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { GiftedChat, Bubble, Composer } from 'react-native-gifted-chat';
import { Actions } from 'react-native-router-flux';

import Momenttchat from './moment';
import Usertchat from './user';
import TimeBuddle from './time';
import moments, { me } from '../../../dummyData';
import styles from './style';

export default class Tchat extends Component {

  static propTypes = {
    moment: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this._isMounted = false;
  }

  componentWillMount() {
    this._isMounted = true;
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
          
          },
        },
        {
          _id: 2,
          text: 'Hi developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 1)),
          user: {
            _id: 2,
            name: 'Simple User',
           
          },
        },
      ],
    });

  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: 'white',
          },
          right: {
            backgroundColor: '#77c782',
          }
        }}
        textStyle={
          {
            left: {
              color: 'black',
            },
            right: {
              color: 'white',
            }
          }
        }
      />
    );
  }

  renderFooter(props) {
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
        </Text>
      </View>
    );
  }

  renderTime(props) {
    return (
      <TimeBuddle {...props} />
    );
  }

  renderComposer(props) {
    return (
      <Composer 
        {...props}
        placeholder='Ecris quelque chose'
      />
    );
  }

  checkTypeTchat() {
    if (this.props.user) {
      return false;
    }
      return true;
  }

  getTchatTypeComponent() {
    if (this.checkTypeTchat()) {
      return(
        <Momenttchat 
          image={this.props.moment.image}
          user={this.props.moment.user} 
        />
      );
    }
    return(
      <Usertchat 
        user={this.props.user} 
      />
    );
  }

  render() {
      return (
        <View style={styles.container}>

          {this.getTchatTypeComponent()}
          
          <View style={styles.giftedChatContainer}>
            <GiftedChat
              messages={ this.state.messages }
              user={{
                _id: 1,
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
                name: me.name,
              }}
              onSend={this.onSend}
              renderBubble={this.renderBubble}
              renderFooter={this.renderFooter}
              renderTime={this.renderTime}
              renderAvatar= { () => null }
              renderComposer={this.renderComposer } 
            />
          </View>
        </View>
      );
  }
}
