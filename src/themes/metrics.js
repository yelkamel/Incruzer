// @flow

import {Dimensions, Platform, PixelRatio} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? height * 0.07 :height * 0.07 ,
  spaceNavBack : (Platform.OS === 'ios') ? height * 0.09 :height * 0.07 ,
  buttonRadius: 4,
  markerSize: 54,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  }
}

export default metrics
