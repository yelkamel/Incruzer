
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } 				from "react-native-router-flux";
import MapView 					from 'react-native-maps';
import Geocoder 				from 'react-native-geocoder';

import { API_GEO } 				from '../../../conf/constants.json';
import theme 					from '../../themes/base-theme';
import Marker 					from './marker';
import { WS_MOMENTS_ADD } 			from '../../constants';


const deviceHeight 		= Dimensions.get('window').height;
const deviceWidth 		= Dimensions.get('window').width;
const {width, height} 	= Dimensions.get('window');



Geocoder.fallbackToGoogle(API_GEO);

/**
 *
 */
export default class Map extends Component {

  state = {
    cached: false,
    regionUser: null,
    address: '',
    fullAddress: null,
    sendingData: false
  };
  	componentWillUnmount() {

	}
  componentDidMount() {
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


    navigator.geolocation.getCurrentPosition((position) => {
      if(position && position.coords ){

        const regionUser =  {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }

        this.updateAddress({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });

        this.setState({regionUser});
        setTimeout(() => { this.setState({cached: true}) }, 1000);
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

  shouldComponentUpdate(nextProps, nextState){
    if(!nextState.regionUser){
      return false;
    }
    return true;
  }

  sendMoment = () => {
	  var momentFile = {
		  uri: this.props.source.uri,
		  name: 'myName',
		  type: ( this.props.type == 'video' ? 'video' : 'image')
	  }

	  var locationData = {
		  name: 'MyAddress',
		  latitude: this.state.fullAddress.position.lat,
		  longitude: this.state.fullAddress.position.lng
	  }

	  //console.log('DATA : ', this.state.fullAddress);
	  //console.log('DATA : ' + JSON.stringify(momentFile));

	  var body = new FormData();

	  body.append('file', momentFile);
	  body.append('time', 'Now');
	  body.append('visibility', 'monde');
	  body.append('media_type', this.props.type);
	  body.append('slowdown_data', '0');
	  body.append('locationLatitude', locationData.latitude);
	  body.append('locationName', locationData.name);
	  body.append('locationLongitude', locationData.longitude);
	  body.append('hashtags', this.props.localHashtag);

	  this.setState({sendingData: true});

	  fetch(WS_MOMENTS_ADD,
	  {
		 method: 'POST',
		 body,
	  })
	  .then((responseData) => {
		  this.setState({sendingData: false});

		  Actions.pop({refresh: {} });
		});
  }

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

  render() {
    return (
      <View>

        {
          this.state.regionUser
          ?
          <View style={{alignItems: 'center'}}>
            <MapView
              provider={this.props.provider}
              ref={ref => { this.map = ref; }}
              style={theme.radiusPopup}
              region={this.state.regionUser}
              cacheEnabled={this.state.cached}
              loadingEnabled
              loadingIndicatorColor="#cc0058"
              loadingBackgroundColor="#eeeeee"
            >
            </MapView>
            <Marker
              updateAddress={this.updateAddress}
              region={this.state.regionUser}
            />
            <View style={styles.addressContainer}>
              <Text style={styles.address}>
                {this.state.address}
              </Text>
            </View>

            {
	            !this.state.sendingData
				?
            <TouchableOpacity
            	onPress={() => this.sendMoment()}
            	style={styles.validationContainer}
            >
              <Image
                style={theme.validation}
                source={
                  require('../../../assets/icons/validation.png')
                }
              />
            </TouchableOpacity>
            :
            <View>
	          <Image
	            source={require('../../../assets/icons/spinner carte.gif')}
	            style={theme.validation}
	          />
            </View>
            }
          </View>
          :
          <Image
            source={require('../../../assets/icons/spinner carte.gif')}
            style={theme.iconLoading}
          />
        }

      </View>
    );
  }
};

Map.propTypes = {
  provider: MapView.ProviderPropType,
};


const styles = StyleSheet.create({
  addressContainer:{
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address:{
    backgroundColor: 'transparent',
    marginTop: 10,
    color: 'white',
  },
  validationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: deviceWidth*0.5,
    height: deviceHeight/6,
  },
});

