'use strict';

import { StyleSheet }  from 'react-native';


export const bigWhitePremiumIconStyle = StyleSheet.create({
  premiumIconContainer: {

  },
  picture: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'transparent',
  },
  userPicture: {
    width: 80,
    height: 80,
    marginLeft: 20,
    borderRadius: 35,
    resizeMode: 'cover',
  },
  proText: {
    color: "#fff",
    fontWeight: "bold"
  }
});


export const mediumWhitePremiumIconStyle = StyleSheet.create({
  premiumIconContainer: {

  },
  picture: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'transparent',
  },
  userPicture: {
    width: 70,
    height: 70,
    marginLeft: 20,
    borderRadius: 35,
    resizeMode: 'cover',
  },
  proText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export const smallBlackPremiumIconStyle = StyleSheet.create({
  picture: {
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    left: 0,
    backgroundColor: 'transparent',
  },
  userPicture: {
    marginLeft: 5,
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  proText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  }
});
