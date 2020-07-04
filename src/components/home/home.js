
import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Alert,
  Platform,
  TouchableOpacity,
  Text,
  AsyncStorage,
  PermissionsAndroid
} from 'react-native';
import MapView 				from 'react-native-maps';
import { connect } 			from 'react-redux';
import {Actions,ActionConst}from 'react-native-router-flux';
import { View }				from 'react-native-animatable';
import styles 				from './style';
import Header 				from './header';
import Footer 				from './footer';
import Marker 				from './marker';
import Tchat 				from '../tchat';
import Popup 				from '../common/popup';
import Search 				from '../common/search';
import UsersListTchat 		from '../tchat/usersList';
import { colors, images, metrics, appStyle } from '../../themes'
import FBSDK from 'react-native-fbsdk';
import {
	WS_MOMENTS_GET,
	WS_REFRESH_TOKEN } 		from '../../constants';

import {
	protectedGet,
	protectedPost
	}			 			from '../../wsFetch';

import Modal from 'react-native-modalbox';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO 		= width / height;
const LATITUDE 			= 48.8587;
const LONGITUDE 		= 2.3475;
const LATITUDE_DELTA 	= 8;
const NUM_MARKERS 		= 100;
const LONGITUDE_DELTA 	= LATITUDE_DELTA * ASPECT_RATIO;
const MARKERS_LATITUDE_DELTA 	= 0.09;
const MARKERS_LONGITUDE_DELTA 	= MARKERS_LATITUDE_DELTA * ASPECT_RATIO;
const PERCENT_SPECIAL_MARKERS 	= 0.1;

const ENTRANCE_MAPS_ANIMATION = 2000


const {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;


import moments from '../../dummyData';

class Map extends Component {

  constructor(props) {

    super(props);

    const markerInfo = moments.map((moment, key) => {
      return {
        location: moment.address.location,
        moment,
        id: (key+1)
      }
    });

    this.friendListModal = null
    this.zoomInTimer  = null
    this.zoomOutTimer = null
    this.markersView = null

    this.state = {
	    urlLoading: false,
	    viewMode: 'world',
	    momentSelected: false,
      isFirstConnexion: false,
      momentDeselected: false,
		  cached: false,
		  loaded: false,
      showMarker: false,
		  coordinateUser: null,
		  tchatPopin: false,
		  usersListPopin: false,
		  region: {
        latitude: LATITUDE,
			  longitude: LONGITUDE,
		  	latitudeDelta: LATITUDE_DELTA,
			  longitudeDelta: LONGITUDE_DELTA
      },
	  	latitudeDelta: LATITUDE_DELTA,
	  	markers: markerInfo,
	  	markersNumber: [],
    };

  }

  requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Enable location',
            'message': 'Location is good \o/',
          },
        );

        if (granted) {
          console.log('You can use the location');
          this.getLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

  loadLocation(){

      AsyncStorage.getItem("currentCoords").then((value) =>
      {
          if ( value !== undefined && value != "" && value != null)
          {
              const coords = JSON.parse(value);

              const { location } = this.props;

              console.log("Value is defined. Yeah.", location);
              console.log("Coords is defined. Yeah.", coords);

              if ( location !== null && typeof location !== "undefined")
              {
                  const coordinateUser = {
                      latitude: 		location.latitude,
                      longitude: 		location.longitude,
                      latitudeDelta: 	coords._latDelta,
                      longitudeDelta: coords._longDelta
                  };


                  this.setState({
                      coordinateUser: coordinateUser,
                      region: 		coordinateUser,
                      latitudeDelta: 	coords._latDelta,
                      urlLoading: 	false,
                      loaded: 		true
                  });

                  this.setlatitudeDelta(coords._latDelta);
                  setTimeout(() => { this.onRegionChange(coordinateUser); }, 1500);
                  this.setState({cached: false});
              }
              else
              {
                  console.log(coords._lat);
                  console.log(coords._long);

                  const coordinateUser = {
                      latitude: 		coords._lat,
                      longitude: 		coords._long,
                      latitudeDelta: 	coords._latDelta,
                      longitudeDelta: coords._longDelta
                  };


                  this.setState({
                      coordinateUser: coordinateUser,
                      region: 		coordinateUser,
                      latitudeDelta: 	coords._latDelta,
                      urlLoading: 	false,
                      loaded: 		true
                  });

                  this.setlatitudeDelta(coords._latDelta);
                  setTimeout(() => { this.onRegionChange(coordinateUser); }, 1500);
                  this.setState({cached: false});
              }
          }
          else
          {
              console.log("using geoloc ...");

              let navigatorOptions = {}

              if (Platform.OS === 'android') {
                  navigatorOptions = {
                      enableHighAccuracy: false,
                      timeout: 10000,
                      maximumAge: 0
                  }
              } else {
                   navigatorOptions = {
                       enableHighAccuracy: true,
                       timeout: 20000,
                       maximumAge: 1000
                   }
              }

              navigator.geolocation.getCurrentPosition((position) =>
              {
                  if(position && position.coords )
                  {
                      var $this = this;
						setTimeout(function()
                      {
                          console.log("Starting.");
						  $this.setState({loaded: true, cached: false});
                          $this.updatePosititon(position.coords);
                      }, 1000);
                      console.log("Found pos : ", position);

                  }
              },
              (error) => {
                  if(error.PERMISSION_DENIED)
                  {
                      Alert.alert(
                          'Erreur',
                          'Tu dois indiquer votre location pour consulter des moments',
                          [
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ]
                      );
                  }
              }
              , navigatorOptions
              );
              setTimeout(() => {
                  this.setState({loaded: true, cached: false})
              }, 1500);

          }
      }).done();
  }

  componentDidMount() {
  	this.setState({cached: false});

  }

  componentWillReceiveProps(nextProps){

      if (nextProps.isFromClosingMoment){

         this.setState({
             momentDeselected: true,
         })

         setTimeout(()=> {
             this.setState({
                 momentDeselected: false,
             })
         }, 500)
      }

      if (nextProps.isFromMomentAddress){
          console.log("=> isFromMomentAddress ");

          const latitudeDelta = this.state.region.latitudeDelta / 80;
          const longitudeDelta = latitudeDelta * ASPECT_RATIO;

          let regionTmp = {
              latitude: nextProps.location.latitude,
              longitude: nextProps.location.longitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
          }

          this.setState({region: regionTmp})
          this.map.animateToRegion(regionTmp)
      }

  }

  responseInfoCallback = (error, result) => {
      if (error) {
        console.log('Error fetching data: ' + JSON.stringify(error));
      } else {
        console.log('Success fetching data: ' + JSON.stringify(result));
      }
    }

 checkFbToken = () => {

     AccessToken.getCurrentAccessToken().then(
     (data) => {
       //alert(data.accessToken.toString())
       if (data == null) {
           Actions.launch({ type: ActionConst.RESET})
       } else {
           const infoRequest = new GraphRequest(
            '/me?fields=name,email,age_range,birthday,gender,political,location,hometown,picture',
            null,
            this.responseInfoCallback,
            )
            new GraphRequestManager().addRequest(infoRequest).start()

           this.setState({
               isFirstConnexion: false
           })
       }
     })
 }

  onSuccessRefreshToken = (responseData) => {
	  	console.log("Data : ", responseData.refresh_token);
	  	AsyncStorage.setItem("userToken", responseData.token);
	  	AsyncStorage.setItem("refreshToken", responseData.refresh_token);

      this.setState({
          isFirstConnexion: false
      })
	  	this.loadLocation()
  }

  onFailRefreshToken = (error) => {
	  console.log("Error : ", error);
      Actions.launch({ type: ActionConst.RESET})

     // this.checkFbToken()
  }

  componentWillMount() {
    /*
	  	AsyncStorage.getItem("refreshToken").then((value) =>
		{
			if( value != "" && value != null )
			{
				console.log("Refresh token : ", value);
				var structToSend = {
				    "refresh_token" : value
			    }
		        protectedPost(
			        WS_REFRESH_TOKEN,
			        structToSend,
			        this.onSuccessRefreshToken,
					this.onFailRefreshToken
		        );
		  	}
		  	else
		  	{
				this.onFailRefreshToken();
		  	}
    }).done();
    */
        AsyncStorage.setItem("currentCoords", "");
        this.loadLocation()
//      AsyncStorage.setItem("refreshToken", "");
//      AsyncStorage.setItem("userToken", "");


  }

  shouldComponentUpdate(nextProps, nextState){
    	if
    	(
    		nextProps != this.props ||
			nextState.region === this.state.region ||
			this.state.cached === false
		)
		{
			console.log("Component should update");
    		return true
    	}

		return true;
  }

  animationToUserPosition = () => {
      const latitudeDelta = this.state.region.latitudeDelta / 80;
      const longitudeDelta = latitudeDelta * ASPECT_RATIO;

      let regionTmp = {
          latitude: this.state.coordinateUser.latitude,
          longitude: this.state.coordinateUser.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
      }

      this.setState({region: regionTmp})
      this.map.animateToRegion(regionTmp, ENTRANCE_MAPS_ANIMATION)
      setTimeout(() => {
          this.setState({
              showMarker: true
          })
      }, ENTRANCE_MAPS_ANIMATION)
  }

  updatePosititon = (coords) => {
  	console.log("Updating pos !");
    const coordinateUser = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.latitudeDelta * ASPECT_RATIO
    };

    this.setState({coordinateUser, cached : false});
    setTimeout(() => {
        this.animationToUserPosition()
        this.onRegionChange(coordinateUser);
    }, 1500);

  };

  fitToCoordinateUser = () => {
    if(this.state.coordinateUser)
    {

      let regionTmp = {
        latitude: this.state.coordinateUser.latitude,
        longitude: this.state.coordinateUser.longitude,
        latitudeDelta: this.state.region.latitudeDelta ,
        longitudeDelta: this.state.region.longitudeDelta ,
      }
      this.setState({region: regionTmp})
	    this.map.animateToCoordinate(this.state.coordinateUser, 1000);
    }
  };

  zoomInOneShot = () => {
	  const latitudeDelta = this.state.region.latitudeDelta / 2;
	  console.log(latitudeDelta);
	  this.setlatitudeDelta(latitudeDelta);
  }

  zoomIn = (startTimer) => {

    if ( startTimer )
    {
      var $this = this
		  const latitudeDelta = this.state.region.latitudeDelta / 2;
		  console.log(latitudeDelta);
    	$this.setlatitudeDelta(latitudeDelta);
    	$this.zoomInTimer = setTimeout(function(){$this.zoomIn(true)}, 460);
    }
    else
    {
	    clearTimeout(this.zoomInTimer);
    }
  };
  openFriendListModal = () => {
    this.friendListModal.open()
  }
  zoomOut = (startTimer) => {

    if ( startTimer )
    {
        var $this = this
		const latitudeDelta = $this.state.region.latitudeDelta * 2;
		if (latitudeDelta < 150)
		{
			console.log(latitudeDelta);
			$this.setlatitudeDelta(latitudeDelta);
			$this.zoomOutTimer = setTimeout(() => {
                $this.zoomOut(true)
            },
            460);
		}
    }
    else
    {
	    clearTimeout(this.zoomOutTimer);
    }
  };


  setlatitudeDelta = (latitudeDelta) => {
    const longitudeDelta = latitudeDelta * ASPECT_RATIO;
    this.map.animateToRegion({
      ...this.state.region,
      latitudeDelta,
      longitudeDelta,
    });
  };

  	onSwitchView = (viewMode) => {
	  	this.setState({ viewMode : viewMode })
	}

  goMoments = (markerMoments) => {

	  AsyncStorage.setItem("currentCoords", JSON.stringify({
		  _lat: this.state.region.latitude,
		  _long:this.state.region.longitude,
		  _latDelta: this.state.region.latitudeDelta,
		  _longDelta: this.state.region.longitudeDelta
	  }))


	  this.setState({momentSelected: true});

	  setTimeout(() => {
          Actions.moments({duration: 0, markerMoments:markerMoments})
          this.setState({momentSelected: false});
      }, 200);
  };

  renderMarkers = () => {
	  console.log("Marker count : " + this.state.markers.length );

    return this.state.loaded &&  this.state.markers.map((markerInfo, index) =>
      <Marker
          ref={ref => { this.markersView = ref; }}
          goMoments={this.goMoments}
          markerInfo={markerInfo}
          index={index}
          key={markerInfo.id} />
    )
  };

  displayTchatPopIn = (flag) => {
    this.setState({ tchatPopin: flag });
  };

  displayUsersListPopin = (flag) => {
    this.setState({ usersListPopin: flag, tchatPopin: !flag });
  };

  onMarkersLoadSuccess = (responseData) => {
	markersTmp = []

	if ( responseData != null && responseData !== undefined && responseData.forEach !== undefined )
	{
		console.log("Now triggering update.");

		responseData.forEach(function(mark)
		{
			let moment = mark.moments[0];
			console.log("Settings markers ...");

            markersTmp = markersTmp.concat({
		        location: mark.address.location,
		        moment: moment,
		        id: mark.id,
		        markData: mark
		    });

		})

		console.log("Updating done.");

        //if (this.markersView != null)
        //    this.markersView.markerExit()

        //setTimeout(()=> {
        this.setState({
            urlLoading  : false,
            markers 	: markersTmp,
            cached		: false,
        })
        //}, 500)

	};

  }


  onMarkersLoadFail = (error) => {
	this.setState( { urlLoading: false } );

	console.log(error);
  }


  onRegionChange = (region) => {

	  if ( this.state.urlLoading )
	  {
		  console.log("Already updating...");
		  return;
	  }

	  if ( !this.state.loaded )
	  {
		  console.log("Not loaded...");
		  return;
	  }

	  this.setState({
          urlLoading: true,
          region: region,
      });

	  const urlBase 	= WS_MOMENTS_GET + this.state.viewMode;

	  const longC = (region.longitude + region.longitudeDelta);
	  const latC  = (region.latitude - region.latitudeDelta);
	  const latA  = (region.latitude + region.latitudeDelta);
	  const longA = (region.longitude - region.longitudeDelta);

	  const url = urlBase + "/"+ latA +"/"+ latC + "/" + longA +"/" + longC;

	  console.log(url);


	  protectedGet(
		url,
		this.onMarkersLoadSuccess,
		this.onMarkersLoadFail
	  );
  }

  zoomLongPress = (coordinate)  => {

      // TODO prendre en compte les coordonées choisi
        const latitudeDelta = this.state.region.latitudeDelta / 2;
        console.log("Zoom Long Press " + latitudeDelta);
        this.setlatitudeDelta(latitudeDelta);
        this.zoomInTimer = setTimeout(function(){$this.zoomIn(true)}, 460);

      setTimeout(()=> {
          clearTimeout(this.zoomInTimer);
      }, 500)
  }

  renderAddFriends(){
      return (
          <Modal style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
              }}
              swipeToClose={true}
              ref={(modal) => {
                this.friendListModal = modal;
            }}>

            <Image
              source={images.friendList}
              style={{
                width: metrics.screenWidth* 0.82,
                height: metrics.screenHeight*0.53,
              }}
            />
          </Modal>
      )
  }

  renderTchatPopin(){
      return (
          <Popup
            percent={0.9}
            percentHeight={0.92}
            close={() => {}}
          >
            <View style={{ flex: 1, width: width*0.9 }}>
              <View
                style={{ flex: 1}}
              >
                <View
                  //horizontal={true}
                  //showBorder={true}
                  style={styles.header}
                >
                  <Search
                    filter={ (textSearch) => this.setState({ textSearch }) }
                    left={
                      <TouchableOpacity
                        style={[
                          styles.blockContainer,
                          {
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                        ]}
                        onPress={
                          () => this.displayUsersListPopin(true)
                        }
                      >
                        <Image
                          source={images.addFriends}
                          style={appStyle.iconLogoSmall}
                        />
                      </TouchableOpacity>
                    }
                    right={
                      this.state.tchatPopin ?
                      <TouchableOpacity
                        onPress={() => this.displayTchatPopIn(false)}
                        style={[
                          styles.blockContainer,
                          {
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                          },
                        ]}
                      >
                        <Image
                          source={require('../../../assets/icons/closeWithCircle.png')}
                          style={[styles.icon]}
                        />
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        style={[
                          styles.blockContainer,
                          {
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                        ]}
                        onPress={() => this.displayUsersListPopin(false)}
                      >
                        <Text style={{ color: '#FFFFFF' }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 6,
                  backgroundColor: this.state.tchatPopin ? 'transparent' : '#FFFFFF'
                }}
              >
                { this.state.tchatPopin ?
                  <Tchat
                    textSearch={this.state.textSearch}
                  />
                  :
                  <UsersListTchat usersSearch={this.state.textSearch} />
                }
              </View>
            </View>
          </Popup>
      )
  }

  renderMomentAnimation(animationType){
      return (<View style={{ position: "absolute", width: width, height: height, top: 0, left: 0, backgroundColor: "#000000" }} animation={animationType} duration={200}>
          <View style={{ backgroundColor:"#000000", flex: 1 }}>

          </View>
      </View>)
  }

  render() {

      if (this.state.isFirstConnexion)
        return (<View></View>)

    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          style={styles.mapFrame}
          showsUserLocation={true}
          userLocationAnnotationTitle={null}
          onLongPress={(LatLng) => this.zoomLongPress(LatLng)}
          cacheEnabled={this.state.cached}
          onRegionChange={ (region) => {this.onRegionChange(region)}}
          loadingEnabled
          loadingIndicatorColor="#cc0058"
          loadingBackgroundColor="#eeeeee"
          onLongPress={() => this.zoomInOneShot()}
        >
            {(!this.state.momentSelected && this.state.showMarker)&& this.renderMarkers()}
        </MapView>

        <Header
            goMoments={this.goMoments}
            openFriendListModal= {this.openFriendListModal}
            moment={moments[this.props.previousMomentId]} onSwitchView={this.onSwitchView}/>
        <Footer
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
          coordinateUser={this.state.coordinateUser}
          fitToCoordinateUser={this.fitToCoordinateUser}
          displayTchatPopIn={this.displayTchatPopIn}
        />
        { this.state.momentSelected && this.renderMomentAnimation("zoomIn")}
        { this.state.momentDeselected && this.renderMomentAnimation("zoomOut")}
        { this.renderAddFriends()}
      </View>
    );
  }
}

export default Map;
