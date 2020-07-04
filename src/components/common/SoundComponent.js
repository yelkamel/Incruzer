// @flow

import React from 'react'
import {View} from 'react-native'


export default class SoundComponent extends React.PureComponent {
  props: {}
  render ():any {
    return <View />
  }

  static playRecord () {
    
    var clirr = new Sound('../../../assets/audio/play.mp3', Sound.MAIN_BUNDLE, (success) => {
      //clirr.setVolume(0.05)
      clirr.play()
    }, (error) => alert(error))
  }

  static stopRecord () {
    var pigSound = new Sound('../../../assets/audio/stop.mp3', Sound.MAIN_BUNDLE, (success) => {
      //pigSound.setVolume(0.05)
      pigSound.play()
    }, (error) => alert(error))
  }

  
}
