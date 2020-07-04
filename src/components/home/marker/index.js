import React , { Component } from 'react';
import {TouchableOpacity,Image} from 'react-native';
import MapView from 'react-native-maps';
import ImageMarker from './image';

const {StyleSheet, Dimensions, Platform} = React;

import theme from '../../../themes/base-theme';
const MOMENT_IMG = require('../../../../assets/icons/moment.png')


class Marker extends Component{

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }


  shouldComponentUpdate(){
    return false;
  }

  componentDidMount(){
/*      setTimeout(()=> {
          this.setState({
              isLoading: false
          })
      }, 500)
      */
  }

//
/*
  image={{uri:  markerInfo.moment.image }}
{(this.state.isLoading)  &&
   <Image
     source={{uri:  markerInfo.moment.image }}
     style={{ position: 'absolute', opacity: 0, width: 1000, height: 1000 }}
   />
 }
 {(!this.state.isLoading) &&
 }
 */


 onMarkerPress = (targetMoments) => {
     this.setState({ darkOverlay: true});

     var $this = this;

     setTimeout(() => { $this.props.goMoments(targetMoments); }, 100);

 }


  render () {
    const { markerInfo, index, goMoments } = this.props;
    return (
		<MapView.Marker
			minDelta={0.5}
			maxDelta={2}
            onPress={() => this.onMarkerPress(markerInfo.markData.moments)}
			coordinate={markerInfo.location}
		>
            <ImageMarker
                moment={markerInfo.moment}
            />
		</MapView.Marker>
    )
  }

}
export default Marker;
