import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import UsersProposal from './usersProposal';
import { me } from '../../dummyData';

export default class InstagramUsersProposal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <UsersProposal users={me.instagramContacts} />
    );
  }
} 