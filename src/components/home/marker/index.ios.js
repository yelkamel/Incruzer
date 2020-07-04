import React , { Component } from 'react';
import { View, Text,TouchableWithoutFeedback } from 'react-native';
import { colors, images, metrics, appStyle } from '../../../themes'

import MapView from 'react-native-maps';
import ZoomMarker from './zoomMarker';

class Marker extends Component{
  constructor(props) {
    super(props)
    this.markerView = null
    this.state = {
      darkOverlay: false
    };
  }
  /*
  shouldComponentUpdate(){
	  return false;
  }*/

  onMarkerPress = (targetMoments) => {
	  this.setState({ darkOverlay: true});

	  var $this = this;

	  setTimeout(() => { $this.props.goMoments(targetMoments); }, 100);

  }

  markerExit = () =>
  {
      if (this.markersView != null)
        this.markerView.markerExit()
  }

  touchableSize (cluster)  {

      if (cluster == 2){
          return {borderRadius: 30,height: metrics.markerSize + 5  , width: metrics.markerSize * 2 - 10}
      }

      if (cluster > 2){
          return {borderRadius: 30, height: metrics.markerSize * 2 - 15, width: metrics.markerSize * 2 -10}
      }

      return {borderRadius: 30, height: metrics.markerSize + 5 , width: metrics.markerSize + 5}
  }

  render() {
    const {markerInfo, index, goMoments} = this.props;
    if ( markerInfo !== undefined && markerInfo != null && markerInfo.markData !== undefined )
    {
    	return (
             <MapView.Marker
	        	minDelta={0.5}
	        	maxDelta={2}
                onSelect={this.props.onSelect}
                onPress={() => this.onMarkerPress(markerInfo.markData.moments)}
                style={this.touchableSize(markerInfo.moment.cluster)}
	        	coordinate={markerInfo.location}
			>
				<ZoomMarker
		       	markerInfo={markerInfo}
		       	index={index}
                ref={ref => { this.markerView = ref; }}
		       	showDarkOverlay={this.state.darkOverlay}
	   		    />
			</MapView.Marker>
	  );
    }

    return null;
  }
}

Marker.propTypes = {
  index: React.PropTypes.number,
  markerInfo: React.PropTypes.object
}

export default Marker;
