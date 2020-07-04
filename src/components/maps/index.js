/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  View
} from 'react-native';
import Supercluster from 'supercluster';
import MapView from 'react-native-maps';



const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 48.8587;
const LONGITUDE = 2.3475;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;


var supCluster = require("supercluster");


function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300 && xhr.response) {
            callback(xhr.response);
        }
    };
    xhr.send();
}


var now = Date.now();

var index;

getJSON('https://raw.githubusercontent.com/mapbox/supercluster/master/test/fixtures/places.json', function (geojson) {
    console.log('loaded ' + geojson.length + ' points JSON in ' + ((Date.now() - now) / 1000) + 's');

	var index = Supercluster({
        log: true,
        radius: 60,
        extent: 256,
        maxZoom: 17
    }).load(geojson.features);

    console.log(index.getTile(0, 0, 0));

    postMessage({ready: true});
});


export default class Maps extends Component {
	constructor(props) {
    	super(props);

		this.state = {
			region: {
				latitude: LATITUDE,
				longitude: LONGITUDE,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
      		},
	    	markers: [],
	    };

	    this.onMapPress = this.onMapPress.bind(this);
  }

	getInitialState() {
	  return {
		region: {
		  latitude: LATITUDE,
		  longitude: LONGITUDE,
		  latitudeDelta: LATITUDE_DELTA,
		  longitudeDelta: LONGITUDE_DELTA,
		},
	  };
	}

	onRegionChange(region) {
	  this.setState({ region });
	}


	onMapPress(e) {
		var marks = this.getMarkersFromApi();
		/**/
		/*marks.forEach(function(mark) {

		});*/


	}

	getMarkersFromApi() {
		return fetch('https://raw.githubusercontent.com/mapbox/supercluster/master/test/fixtures/places.json')
			.then((response) => response.json())
			.then((responseJson) => {
				var $this = this;
				responseJson.forEach(function(mark) {
					$this.state.markers.push(
				    {
				      coordinate: { "latitude" : mark.latitude, "longitude" : mark.longitude },
				      key: `foo${id++}`,
				      title: mark.title
					});

				})

				this.setState({
				  	markers: [...this.state.markers]
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}


	onPressButtonGET() {
		this.getMarkersFromApi();
	}


  render() {
	return (
	  <View style={styles.container}>

		<MapView
			provider={this.props.provider}
			ref={ref => { this.map = ref; }}
			style={styles.mapView}
			initialRegion={this.state.region}
			onPress={this.onMapPress}
			onRegionChange={region => this.onRegionChange(region)}
		>
			{this.state.markers.map(marker => (
	            <MapView.Marker
	              title={marker.title}
	              key={marker.key}
	              coordinate={marker.coordinate}
	            />
	         ))}
        </MapView>
        <TouchableHighlight onPress={this.onPressButtonGET} style={styles.button}>
                    <Text>GET</Text>
        </TouchableHighlight>
	  </View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#F5FCFF',
  },
  mapView: {
	position: 'absolute',
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
  },
  welcome: {
	fontSize: 20,
	textAlign: 'center',
	margin: 10,
  },
  instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
  },
});
