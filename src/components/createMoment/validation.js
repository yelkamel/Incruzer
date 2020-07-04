import React from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  CameraRoll,
  Dimensions,
  Alert,
  Text,
} from 'react-native';

import Video 					from 'react-native-video';
import { Actions } 				from "react-native-router-flux";
import { getMomentPhotoDate } 	from '../../helpers';
import theme 					from '../../themes/base-theme';
import styles 					from './style.js';
import Compass 					from './compass.js';
import Popup 					from '../common/popup.js';
import Share 					from '../share';
import Hashtag 					from '../hashtag';
import { WS_MOMENTS } 			from '../../constants';
import { API_GEO } 				from '../../../conf/constants.json';
import Geocoder 				from 'react-native-geocoder';
import { WS_MOMENTS_ADD } 			from '../../constants';
import { protectedPost } 		from '../../wsFetch';
import Modal from 'react-native-modalbox';
import AddTagStep1 from "../tag/newTag/step1"


const deviceHeight 		= Dimensions.get('window').height;
const deviceWidth 		= Dimensions.get('window').width;
const {width, height} 	= Dimensions.get('window');



Geocoder.fallbackToGoogle(API_GEO);

export default class Validation extends React.Component {

  static propTypes = {
    response: React.PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.state = {
      isShutdown: false,
      compass: 		false,
      share: 		false,
      hashtag: 		false,
      localHashtag: "",
      regionUser: null,
      selectMedia: 	false,
      address: '',
      fullAddress: null,
      sendingData: false
    };

    if (Platform.OS === 'ios')
    {
      	this.source = {
       		uri: this.props.response.uri.replace('file://', ''),
        	isStatic: true,
      	};
    }
    else
    {
      	this.source = {
        	uri: this.props.response.uri,
			isStatic: true,
      	};
    }
  }

/*
  loadPositionData() {
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


    navigator.geolocation.getCurrentPosition((position) => {
      if(position && position.coords ){
           var $this = this;
/*
        this.updateAddress({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        setTimeout(() =>
        {
            $this.setState({
                regionUser: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }
            });
        }, 500)
      }
    }, (error) => {

      if(error.PERMISSION_DENIED){
        Alert.alert(
          'Erreur',
          'Tu dois indiquer votre location pour consulter des moments',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        );
      }
      else{
        Alert.alert(
          'Whoops!',
          error,
          [
            {text: 'Close', onPress: () => console.log('OK Pressed')},
          ]
        );
      }
    }
    , {timeout: 20000, maximumAge: 1000}
    );

  }
  */

  componentWillUnmount(){
      this.camera = null;

      this.setState({
          isShutdown: true
      })
  }

  componentWillMount() {
    //  this.loadPositionData()

    if (this.props.response.timestamp) {
      alert(getMomentPhotoDate(this.props.response.timestamp));
    }
  }

  saveMedia = () => {

    if (Platform.OS === 'ios') {
    CameraRoll.saveToCameraRoll(this.source.uri, this.props.response.type == 'image' ? 'photo' : 'video').then((data) => {
                        console.log("Save To CameraRoll " + this.source.uri)
                    }).catch((error) => {
                        console.error("Save to Cameral roll  error: ",error.message)})
    }
  }

  getVideo() {
    return(
      <Video
        resizeMode='cover'
        source={this.source}
        style={{
          flex: 1
        }}
        muted={false}
        resizeMode="cover"
        paused={false}
        repeat={true} />
    );
  }

  getImage() {
    return(
      <Image
        source={this.source}
        style={{ flex: 1, resizeMode: 'cover' }}
      />
    );
  }

  displayMedia() {
    if(this.props.response.type === 'video') {
      return this.getVideo();
    }
    return this.getImage();
  }
  /*
  displayCompass = (flag) => {
    this.setState({compass: flag});
  }
  */

  displayShare = (flag) => {
    this.setState({share: flag});
  }
  displayHashtag = (flag) => {
    this.setState({hashtag: flag});
  }

  setHashtag = (hashtag) => {
   
    this.setState({localHashtag : hashtag});
	  console.log("New hashtag : " + hashtag);
  }

/*
  updateAddress = async (position) => {
    try {
      const res = await Geocoder.geocodePosition(position);

      console.log('updateAddress', res);
      if(res[0])
      {
        this.setState({address: res[0].formattedAddress});
        this.setState({fullAddress: res[0]});
      }

    }
    catch(err) {
      console.log(err);
    }
  }
*/

    closeNewTagModal = () => {
        this.tagModal.close()
        this.setState({
            isAddingTag: false
        })
    }

    addNewTagModal = () => {
        this.tagModal.open()
        this.setState({
            isAddingTag: true
        })
    }

    onSendMomentSuccess = (responseData) => {
     if ( typeof responseData.id !== 'undefined' ) {
          this.setState({sendingData: false});
          Actions.pop({refresh: {} });
      }
      else
      {
          this.setState({ sendingData : false });
          console.log("Error: responseData undefined when sending moment");
      }
    }

    onSendMomentFail = (responseData) => {
      this.setState({ sendingData : false });
      console.error(error);
    }

    sendMoment = () => {
      Actions.pop({refresh: {} });
      /*
     if (this.props.coordinateUser == null)
        return
  	  let locationData = {
  		  name: 'MyAddress',
  		  latitude: this.props.coordinateUser.latitude,
  		  longitude: this.props.coordinateUser.longitude
  	  }

      let momentType = (this.props.response.type == 'video' ? 'video' : 'image')

      let momentFile = {
        uri: this.source.uri,
   		name: 'myName',
   		type: momentType
   	  }

	    const body = new FormData();

      body.append('file', momentFile);
      body.append('time', 'now');
      body.append('visibility', 'monde');
      body.append('media_type', momentType);
      body.append('slowdown_data', '0');
      body.append('locationLatitude', locationData.latitude);
      body.append('locationLongitude', locationData.longitude);
      body.append('locationName', locationData.name);
      body.append('hashtags', this.state.localHashtag);

  	  this.setState({sendingData: true});
    
      protectedPost(
          WS_MOMENTS_ADD,
          body,
          this.onSendMomentSuccess,
          this.onSendMomentFail,
           'multipart/form-data'
      );
      */
    }

  renderCross(){
      return (
          <View
            style={
                {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }
            }
          >
            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={ () => this.props.cancelValidation() }
            >
              <Image
                source={require('../../../assets/icons/x.png')}
                style={[
                  styles.icon,
                  { width: 20, height: 20 }
                ]}
              />
            </TouchableOpacity>
          </View>
      )
  }

  renderOption(){
      return (
          <View
            style={
                {
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  marginRight: -10,
                }
            }
          >
            <TouchableOpacity style={[styles.closeButton, {
              borderColor: 'white',
                borderWidth: 4,
                borderRadius: 19,
                height: 37,
                width: 37,
                marginRight: 5,
                position: 'relative',
                top: -5
                }]}
                onPress={this.addNewTagModal}
            >
              <Image
                source={require('../../../assets/icons/addHashtag_small.png')}
                style={[styles.icon, { width: 18, height: 18}]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.closeButton]}
              onPress={ () => {
                  this.setState({ hashtag: true })
              }}>
              <Image
                source={require('../../../assets/icons/hashtag.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.saveMedia()}
              style={[styles.closeButton]}>
              <Image
                source={require('../../../assets/icons/edit.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ () => this.setState({ share: true }) }
              style={[
                styles.closeButton,
                styles.buttonText
              ]}
            >
              <Image
                source={require('../../../assets/icons/share.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
      )
  }

  render() {

    if (this.state.isShutdown)
        return(<View></View>)

    return (
      <View style={[styles.container]}>
        <Image
          source={require('../../../assets/images/spinner.gif')}
          style={theme.loading}
        />
        {this.displayMedia()}
        <View style={[styles.overlay, styles.topOverlay]}>
         {!this.state.isAddingTag && this.renderCross()}
         {!this.state.isAddingTag && this.renderOption()}
        </View>
        {
          this.state.compass &&
          <Compass
            displayCompass={() => this.displayCompass(false)}
            type={this.props.response.type}
            source={this.source}
            localHashtag={this.state.localHashtag}
          />
        }
        {
          this.state.share &&
          <Popup
            percent={0.9}
            percentHeight={0.5}
            close={() => this.displayShare(false)}
          >
            <Share
              response={this.props.response}
            />
          </Popup>
        }
        {
          this.state.hashtag &&
          <Popup
            percent={1}
            percentHeight={0.5}
            close={() => this.displayHashtag(false)}
          >
            <Hashtag
              response={this.props.response} setHashtag={this.setHashtag} close={() => this.displayHashtag(false)}
            />
          </Popup>
        }
        { !this.state.isAddingTag &&
            <View style={[styles.overlay, {bottom: 0}]}>
                <TouchableOpacity
                  style={[styles.validateView]}
                  onPress={() => this.sendMoment()}
                >
                  <Image
                    source={require('../../../assets/icons/validationMoment.png')}
                    style={styles.iconValidate}
                  />
                </TouchableOpacity>
            </View>
        }

        {<Modal style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
            }}
            swipeToClose={false}
            ref={(modal) => {
              this.tagModal = modal;
            }}>
            <AddTagStep1
               closeNewTagModal={this.closeNewTagModal}
               types={this.props.type}
               momentId={this.props.momentId}
               goToNextStep={this.goToNextStep}>
            </AddTagStep1>
        </Modal>}
      </View>
    );
  }
};
