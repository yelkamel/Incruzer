import React, { Component } from 'react';
import { 
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions 
} 
from 'react-native';
import { Actions } from "react-native-router-flux";

import theme from '../../themes/base-theme';
import styles from './style';

export default class User extends Component {
  
  static propTypes =  {
    detail: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    
    this.state = {
    	enabled: true,
    }
  }

  render() {
    const { detail } = this.props;
    return(
      	<View style={userStyle.container}>
        	
        	<View style={userStyle.leftContainer}>
        	
				<View style={userStyle.imageContainer}>
					<View style={userStyle.backgroundImage}>
						<Image
							source={{ uri: detail.picture }}
							style={userStyle.image}>
						</Image>
					</View>
				</View>
				
				<View style={userStyle.nameContainer}>
					<View style={userStyle.textContainer}>
						<Text style={[ theme.textWhiteBold, userStyle.username]}>
							{detail.username}
						</Text>
					</View>
					
					<View style={userStyle.textContainer}>
						<Text style={[theme.textWhiteBold, userStyle.name]}>
							{detail.name}
						</Text>
					</View>
				</View>
			</View>
       
			<TouchableOpacity 
				style={userStyle.rightContainer}
				onPress={
					() => {
						this.setState({ enabled: !this.state.enabled });
            		}
            	}
			>
				{ !this.state.enabled && 
					<Image
              			style={userStyle.icon}
			  			source={require('../../../assets/icons/check.png')} 
			  		/>
			  	}
			  	{ this.state.enabled && 
					<Image
              			style={[userStyle.icon, { tintColor: "green" }]}
			  			source={require('../../../assets/icons/check.png')} 
			  		/>
			  	}
			</TouchableOpacity>
		</View>
    );
  }
}

const userStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 2,
    paddingVertical: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    
    backgroundColor: 'transparent',
  },
  name: {
    color: 'gray',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  rightContainer: {
    flex: 1,
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  }
});