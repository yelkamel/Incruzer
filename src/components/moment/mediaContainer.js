
import React, { PureComponent } from 'react';
import { Image, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import Spinner from '../common/spinner';
import styles from './style';

export default class MediaContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.scrollNext = this.props.scrollNext;

    this.state = {
      displaySpinner: 	true,
      repeat: 			false,
      hasStarted: 		false,
    };

    this.onLoad = this.onLoad.bind(this);
  }

  getRepeat(value ) {
  	if (value == "true" || value == true)
    {
	  	return true;
    }
    return false;
  }

  getStart() {
	if (this.props.pause === true)
    {
	  return true;
    }
    if (this.props.play === true)
    {
	  return true;
    }
    console.log("Index : " + this.props.index);
    console.log("Routekey : " + this.props.routeKey);
    return this.props.routeKey !== this.props.index;
  }

  onLoad(data) {
	  if( typeof this.props.setMomentDuration !== 'undefined' )
	  {
	  	  console.log('Duration :' + JSON.stringify(data));
	  	  this.props.setMomentDuration(data.duration);
	  }
  }

  videoError() {
	  console.log("Error on video");
  }

  videoBuffer() {
	  //console.log("video buffering");
  }

  videoEnded() {
	  if (typeof this.scrollNext !== "undefined")
	  {
		  this.scrollNext();
	  }
  }

  hideSpinner = async () => {
    await this.setState({ displaySpinner: false });

    if( this.state.hasStarted === false )
    {
	    console.log("Calling hasStarted");
	    this.setState({ hasStarted: true });

	    if( typeof this.props.startMomentTimer !== 'undefined' )
	    {
			    this.props.startMomentTimer();
	    }
    }
  };

  getVideo() {

    return(
      <View>
        { this.state.displaySpinner ?
          <Spinner />
          :
          null
        }
        <Video
          source={this.props.source}
          rate={1.0}
          style={styles.imageContainer}
          muted={this.state.displaySpinner}
          onProgress={() => this.hideSpinner()}
          onError={() => this.videoError()}
          onBuffer={() => this.videoBuffer()}
          onEnd={() => this.videoEnded()}
          onLoad={this.onLoad}
          resizeMode="cover"
          paused={this.getStart()}
          repeat={this.getRepeat(this.props.repeat)}
        />
        <View style={styles.imageAbsoluteContainer}>
          {this.props.children}
        </View>
      </View>
    );
  }

  getImage() {
    return(
      <Image
        source={this.props.source}
        style={styles.imageContainer}
      >
        {this.props.children}
      </Image>
    );
  }

  render() {

    if(this.props.type === 'video') {
      return this.getVideo();
    }
    return this.getImage();
  }

}
