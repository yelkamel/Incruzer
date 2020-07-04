import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { 
  hashtagInputLimitLength,
  hashtagInputPlaceholderText,
} from '../../constants';
import theme from '../../themes/base-theme';

export default class Hashtag extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hashtagInput: '',
    }
  }
  
  setHashtag = () => {
	  this.props.setHashtag(this.state.hashtagInput);
	  this.props.close();
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.hashtagInput}
          multiline = {true}
          onChangeText={(hashtagInput) => {
	          
            const count = (hashtagInput.match(/\n/g) || []).length;
            
            if (count < 2 && hashtagInput.length <= hashtagInputLimitLength) 
            {
            	this.setState({ hashtagInput });
            }
            
          }}
          placeholder={hashtagInputPlaceholderText}
          placeholderTextColor={'grey'}
          value={this.state.hashtagInput}
          underlineColorAndroid='rgba(0,0,0,0)'
        />
        <TouchableOpacity 
              style={[styles.validationContainer]}
              onPress={() => this.setHashtag()}
            >
          <Image 
            style={theme.validation}
            source={
              require('../../../assets/icons/validation.png')
            }
          />
        </TouchableOpacity>
      </View>
    );
  }

}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  hashtagInput: {
    width: deviceWidth*0.9,
    height: deviceHeight/10,
    borderRadius: deviceHeight/26,
    padding: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'HelveticaNeue',
  },
  validationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: deviceWidth*0.5,
    height: deviceHeight/6,
  },
});