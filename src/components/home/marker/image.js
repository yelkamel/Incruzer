import React, { Component } from 'react';
import {
  Platform,
  Image,
  View,
  Text,
} from 'react-native';
import styles from './style';
import Cluster from './cluster';
import Spinner from 'react-native-spinkit';
import { colors, images, metrics, appStyle } from '../../../themes'
import _ from 'lodash'

class ImageMarker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scale: Platform.OS == 'android' ? 1 : 1,
      loadCluser: false
    };
  }

  renderMomentAlone(image, cluster, unread, showDarkOverlay)
  {

      let randomColors = colors.randomList[_.random(colors.randomList.length - 1)]
		return (
		  <View style={ styles.container} >
              <Spinner
                   style={[styles.imageContainer]}
                   isVisible={true}
                   size={metrics.markerSize}
                   type="WordPress"
                   color={randomColors}/>

	          	<Image
	            	style={[
						styles.image,
                        {
                        top: 6,
                        left: 6
                       }
					]}
					source={{uri: image}}
				/>
				{ showDarkOverlay &&
                    <View style={[styles.darkOverlay, {
                        top: 6,
                        left: 6,
                        }]}>
					</View>
				}

	      </View>
      );
  }

  renderTwoMoments(image, cluster, unread, markerInfo ,showDarkOverlay)
  {
      let randomColors = colors.randomList[_.random(colors.randomList.length - 1)]

	  return (
		  <View style={ styles.twoContainer } >
              <Spinner
                   style={[styles.leftTwoImageContainer]}
                   isVisible={true}
                   size={metrics.markerSize}
                   type="WordPress"
                   color={randomColors}/>
	          	<Image
                    style={[
						styles.image,
                        {
                        top: 7,
                        left: 5
                       }
					]}
					source={{uri:  markerInfo.moments[0].image }}
				/>
				{ showDarkOverlay &&
                    <View style={[styles.darkOverlay, {
                        left: 7,
                        top: 5,
                        }]}>
					</View>
				}
                <Spinner
                     style={[styles.rightTwoImageContainer]}
                     isVisible={true}
                     size={metrics.markerSize}
                     type="WordPress"
                     color={randomColors}/>
	          	<Image
                    style={[styles.image,
                        {
                        top: 7,
                        left: 44 ,
                       }]}
					source={{uri:  markerInfo.moments[1].image }}
				/>
				{ showDarkOverlay &&
					<View style={[styles.darkOverlay, {
                        top: 7,
                        left: 44,
                        }]}>
					</View>
				}
	      </View>
      );
  }

  renderThreeMoments(image, cluster, unread, markerInfo, showDarkOverlay) {
	  console.log("ClusterB " + cluster);
      let randomColors = colors.randomList[_.random(colors.randomList.length - 1)]

	  return (
		  <View style={ styles.threeContainer } >
              <Spinner
                   style={[styles.leftImageContainer]}
                   isVisible={true}
                   size={metrics.markerSize}
                   type="WordPress"
                   color={randomColors}/>

               <Image
                   style={[styles.image,
                       {
                       top: 39,
                       left: 7 ,
                      }]}
					source={{uri: markerInfo.moments[0].image }}
				/>
				{ showDarkOverlay &&
                    <View style={[styles.darkOverlay, {
                        top: 39,
                        left: 7,
                        }]}>
					</View>
				}

            <Spinner
                 style={[styles.rightImageContainer]}
                 isVisible={true}
                 size={metrics.markerSize}
                 type="WordPress"
                 color={randomColors}/>
	          	<Image
	            	style={[
						styles.image,
                        {
                        top: 39,
                        left: 43,
                       }]}
  					source={{uri:  markerInfo.moments[1].image }}
				/>
				{ showDarkOverlay &&
                    <View style={[styles.darkOverlay, {
                        top: 39,
                        left: 43,
                        }]}>
					</View>
				}


            <Spinner
                 style={[styles.topImageContainer]}
                 isVisible={true}
                 size={metrics.markerSize}
                 type="WordPress"
                 color={randomColors}/>
	          	<Image
	            	style={[
						styles.image,
                        {
                        top: 7,
                        left: 25,
                       }]}
					source={{uri:  markerInfo.moments[2].image }}
				/>
				{ showDarkOverlay &&
                    <View style={[styles.darkOverlay, {
                        top: 7,
                        left: 25,
                        }]}>
					</View>
				}

	        {
	          cluster
	          &&
	          <Cluster
	            cluster={cluster}
	            unread={unread}
	          />
	        }
	        {
		      //  markerInfo.event
		       (cluster>= 20)
		        &&
		        <Image
	            	style={[
						styles.event,
					]}
					source={
	            		require('../../../../assets/icons/event-bear.gif')
					}
	          	/>
	        }
	      </View>
      );
  }


  render() {
    const { moment:{ image, cluster, unread }, markerInfo, showDarkOverlay } = this.props;
    //console.log("Moment : " + JSON.stringify(markerInfo));
    if ( markerInfo !== undefined && markerInfo != null && markerInfo.markData !== undefined )
    {

	    if ( cluster == 1  || cluster == null )
	    {
		    return this.renderMomentAlone(image, cluster, unread, showDarkOverlay);
	    }
	    else if ( cluster == 2 )
	    {
		    return this.renderTwoMoments(image, cluster, unread, markerInfo.markData, showDarkOverlay);
	    }
	    else
	    {
		    return this.renderThreeMoments(image, cluster, unread, markerInfo.markData, showDarkOverlay);
	    }
    }

    return null;

  }
}

export default ImageMarker;
