import React from 'react';
import {
  Image,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Popup from '../common/popupPanResponder';
import Follow from '../follow';
import Background from '../common/background';
import theme from '../../themes/base-theme';
import { me, usersList } from '../../dummyData';

const socialNetworkList = [
  {
    label: 'Invite Instagram Friends',
    image: require('../../../assets/logos/logoWithFacebook.png'),
  },
  {
    label: 'Invite Facebook Friends',
    image: require('../../../assets/logos/logoWithFacebook.png'),
  },
  {
    label: 'Invite Twitter Friends',
    image: require('../../../assets/logos/logoWithFacebook.png'),
  },
  {
    label: 'Invite Contact',
    image: require('../../../assets/logos/logoContact.png'),
  },
];


const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");

export default class Invite extends React.Component {

  renderHeader() {
    return (
      <View style={{flex: 1}} >
        <View style={styles.imageContainer} >
          <Image
            source={require('../../../assets/logos/friends.png')} 
            style={styles.image}
          />
          <Text style={styles.title}>
            Friends
          </Text>
        </View>
        <Background
          horizontal={true}
          showBorder={true}
          style={styles.header}
        >

          <TouchableOpacity onPress={() => this.props.setVisibleInvite()}>
            <Image
              source={
                require('../../../assets/icons/closeWithCircle.png')
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </Background>

      </View>
    );
  }

  renderSocialNetwork() {
    return socialNetworkList.map(
      (social, key) => (
        <View
          style={styles.rowSocialNetwork}
          key={key}
        >
          <Image
            style={theme.iconLogoSmall}
            source={social.image}
          />
          <Text>{social.label}</Text>
          <Image
            source={
              require('../../../assets/icons/next.png')
            }
            style={styles.icon}

          />
        </View>
      )
    );
  }

  render() {

    return (
      <Popup
        percent={0.9}
        percentHeight={0.9}
        close={() => this.props.setVisibleInvite()}
        style={{borderRadius: 25}}
      >
        <View style={{
          flex: 1,
          width: deviceWidth*0.9,
          marginTop: 50,
          borderRadius: 25
        }}>
          <View
            style={{ flex: 1}}
          >
            {this.renderHeader()}
          </View>
          <View style={styles.bottomContainer}>
            <View style={{ flex: 1 }}>
              {this.renderSocialNetwork()}
            </View>
            <View style={styles.usersListContainer}>
              <Text>Instagram Friends on Incruizer</Text>
              <Follow
                type={'FOLLOWERS'}
                usersList={usersList}
              />
            </View>

          </View>
        </View>
      </Popup>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    borderRadius: 25,
    borderRadius: 25,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 10,
  },
  bottomContainer: {

    flex: 6,
    backgroundColor: 'white',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  imageContainer: {
    position: 'absolute',
    top: -50,
    left: ((deviceWidth - deviceWidth/3) / 2)* 0.9,
    zIndex: 100,
  },
  image: {
    width: deviceWidth/3,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  rowSocialNetwork: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTopColor: 'gray',
    borderTopWidth: 1,
  },
  usersListContainer: {
     flex: 1,
     padding: 10,
     borderTopColor: 'gray',
     borderTopWidth: 5,
  }

});
