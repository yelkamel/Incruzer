import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import moment 			from 'moment';
import KeyboardSpacer 	from 'react-native-keyboard-spacer';

import UserIcon 		from '../common/UserIcon';
import theme 			from '../../themes/base-theme';
import { me, usersList, messages } from '../../dummyData';
import Message 			from './message';
import Background 		from '../common/background';
import Popup 			from '../common/popup';
import Search 			from '../common/search';


const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
const emptyArray = [];

export default class Tchat extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      messages: emptyArray,
      userId: usersList[0].id,
      textInputValue: '',
      userSearch: '',
    }
  }
  componentWillMount() {
    let messagesFiltered = messages.filter(message => {
        return ((this.state.userId == message.userId) || 
        (this.state.userId == message.receiverId));
      }
    );
    this.setState({ messages: messagesFiltered });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.textSearch || nextProps.textSearch === '') {
      this.filter(nextProps.textSearch);
    }
  }

  setUser = (userId) => {
    this.setState({ userId }, () => {
      let messagesFiltered = messages.filter(message => {
          return ((this.state.userId == message.userId) || 
          (this.state.userId == message.receiverId));
        }
      );
      this.setState({ messages: messagesFiltered });
    });

  };

  getUserIcon(user, key) {
    return(
      <TouchableOpacity
        onPress={() => this.setUser(user.id)}
        key={key} style={styles.userIconContainer}>
        <UserIcon 
        stylesPremiumName={'smallBlackPremiumIconStyle'}
        user={user} />
      </TouchableOpacity>
    );
  }
  
  getUsersListIcons() {
    return usersList.map((user, key) => {
      return this.getUserIcon(user, key);
    });
  }

  getMessages() {
    return this.state.messages.map((message, key) => {
      let marginBottom = 1;
      if (key < (this.state.messages.length - 1) && 
        this.state.messages[key + 1].userId != message.userId) {
        marginBottom = 15;
      }
      return(
        <View 
          style={[
            styles.messageContainer,
            { 
              marginBottom,
            }
          ]} 
          key={key}>
          <Message 
            text={message.text} 
            time={message.time} 
            me={(message.userId == me.id)}
          />
        </View>
      );
    });
  }

  setTextInputValue = (value) => {
    this.setState({ textInputValue: value });
  };

  setMessages = () => {
    if (this.state.textInputValue != '') {
      let messages = this.state.messages;
      messages.push({ 
        userId: 'me',
        receiverId: this.state.userId,
        text: this.state.textInputValue,
        time: moment().format('X'), 
      });
      this.setState({ messages }, () => {
        this.setState({ textInputValue: '' });
      });
    }
  };

  filter = (textSearch) => {
    if (textSearch == '') {
      this.setUser(this.state.userId);
    } else {
      const search = this.state.messages.filter(message => 
        message.text.toLowerCase().includes(textSearch.toLowerCase())
      );
      
      this.setState({
        messages: search,
      });
    }
  };



  render() {
    return (
      <View style={[theme.container, { backgroundColor: 'transparent' }]}>
        <View style={styles.usersIconsContainer}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {this.getUsersListIcons()}
          </ScrollView>
        </View>
        <View style={styles.bodyContainer}>
          <View style={{ flex: 1 }}>
            <Image 
              style={styles.imageBackground}
              source={require('../../../assets/images/background-tchat.png')}
            >
              <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={styles.dayContainer}>
                  <Text style={styles.dayText}>Today</Text>
                </View>
                <View style={styles.messagesContainer}>
                  {this.getMessages()}
                </View>
              </ScrollView>  
            </Image>
          </View>
          <View style={styles.backgroundContainer}>
            <View
              //horizontal={true}
              showBorder={true}
              top={true}
              style={{
	              backgroundColor: "#FEFEFE",
				  justifyContent: 'center',
				  paddingHorizontal: 10,
					  borderBottomLeftRadius: 10,
					  borderBottomRightRadius: 10,
					  height: 65
              }}
            >
              <View style={styles.textInputContainer}>
                <TextInput
                  multiline = {true}
                  style={styles.textInput}
                  onChangeText={ value => {
                    this.setTextInputValue(value);
                  }}
                  value={this.state.textInputValue}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setMessages();
                  }}
                >
                  <Image 
                    style={styles.iconSend}
                    source={require('../../../assets/icons/validation.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <KeyboardSpacer onToggle={
            () => null
          } />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageBackground: {
    flex: 1,
    height: null,
    width: null,
  },
  dayContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    marginBottom: 10,
  },
  dayText: {
    color: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  messageContainer: {
    width: deviceWidth*0.9,
    minHeight: deviceHeight/13,
  },
  backgroundContainer: {
    height: deviceHeight/8,
    width: deviceWidth*0.9,
  },
  textInputContainer: {
    flexDirection: 'row',
    height: deviceHeight/15,
    zIndex: 1 
  },
  textInput: {
    flex: 1,
    borderRadius: deviceHeight/36,
    marginRight: 15,
    paddingHorizontal: 5,
    backgroundColor: '#FAFAFA',
    borderColor: "#DADADA",
    borderWidth: 1,
    borderStyle: "solid"
  },
  iconSend: {
    height: deviceHeight/16,
    width: deviceHeight/16,
    resizeMode: 'contain',
  },
  usersIconsContainer: { 
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#CECECE',
    height: deviceHeight/8,
  },
  userIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth/4.8,
    height: deviceHeight/9,
  }
});

