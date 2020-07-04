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

import UserIcon from '../common/UserIcon';
import theme from '../../themes/base-theme';
import { me, usersList } from '../../dummyData';
import Background from '../common/background';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
const emptyArray = [];

export default class UsersListTchat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usersList,
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.usersSearch);
    if (nextProps.usersSearch || nextProps.usersSearch === '') {
      this.filter(nextProps.usersSearch);
    }
  }

  filter = (usersSearch) => {
    if (usersSearch == '') {
      this.setState({ usersList }, () => {
        console.log(this.state.usersList);
      });
    } else {
      const searchUsersList = this.state.usersList.filter(user => 
        user.name.toLowerCase().includes(usersSearch.toLowerCase())
      );
      this.setState({
        usersList: searchUsersList,
      });
    }
  }

  getStyleDisplayUserPictureByUserType(user) {
    return <UserIcon 
      stylesPremiumName={'smallBlackPremiumIconStyle'}
      user={user} />;
  }

  getUser(user, key) {
    return(
      <View key={key} style={styles.userLine}>
        <View style={styles.userLineLeftContent}>
          <View style={{}}>
            { this.getStyleDisplayUserPictureByUserType(user) }
          </View>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={styles.userText}>{user.name}</Text>
            <Text style={styles.userText}>{user.snapshot}</Text>
          </View>  
        </View>
      </View>
    );
  }

  getUsers() {
    return this.state.usersList.map(
      (user, key) => this.getUser(user, key)
    );
  }


  render() {
    return (
      <View style={[theme.container, { backgroundColor: 'transparent' }]}>
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.getUsers()}
          </ScrollView>
        </View>
        <KeyboardSpacer onToggle={
            () => null
        } />
      </View>
    );
  }
};

const styles = StyleSheet.create({
	userText: {
		fontSize: 12,
		fontFamily: 'HelveticaNeue',
		fontWeight: '100',
	},
	userLine: {
    	flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 70,
  	},
  	userLineLeftContent: {
    	flex: 2,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
  	},
});

