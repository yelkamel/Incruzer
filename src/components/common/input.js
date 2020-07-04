import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';

import theme from '../../themes/base-theme';

class Input extends Component {

  static propTypes = {
    borderWidth: React.PropTypes.number,
    borderColor: React.PropTypes.string,
    borderRadius: React.PropTypes.number,
    color: React.PropTypes.string,
    text: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    fontSize:  React.PropTypes.number,
    fontWeight: React.PropTypes.string,
    fontFamily: React.PropTypes.string,
    width:  React.PropTypes.number,
    height: React.PropTypes.number,
    pencil: React.PropTypes.bool,
    setStateInputValue: React.PropTypes.func,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 25,
    color: 'rgba(255,255,255, 1)',
    text: '',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
    width: 250,
    height: 50,
    placeholder: '',
    pencil: false,
    setStateInputValue: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: props.defaultValue ? props.defaultValue : '',
    }
  }

  getStyles() {
    return StyleSheet.create({
      textInputBorder: {
        borderColor: 	this.props.borderColor,
        borderWidth: 	this.props.borderWidth,
        borderRadius:	this.props.borderRadius,
        width: 			this.props.width,
        height: 		this.props.height,
        color:  		this.props.color,
        fontSize: 		this.props.fontSize,
        fontFamily: 	this.props.fontFamily,
        textAlign: 		'center',

      },
    });
  }

  render() {
    const styles = this.getStyles();
    return(
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          ref='input'
          onChangeText={
            (text) => {
              this.props.setStateInputValue(text);
              this.setState({ text });
            }  
          }
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor || "#FFFFFF"}
		  placeholderStyle={this.props.placeholderStyle || { color: "#FFFFFF", fontWeight: 'bold', fontSize: 17, fontFamily: 'HelveticaNeue' }}	
		  keyboardType={this.props.keyboardType || "default"}
          value={this.state.text}
          underlineColorAndroid='rgba(0,0,0,0)'
          style={this.props.style || styles.textInputBorder} />
        {
          this.props.pencil && this.state.text === '' &&
          <TouchableOpacity onPress={() => { 
              this.refs.input.focus(); 
            }}
          >
            <Image 
              style={{
                tintColor: theme.red, 
                flex: 1,
                resizeMode: 'contain',
                height: 20, 
                width: 20,
              }}
              source={
                require('../../../assets/icons/edit.png')
              }
            />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

export default Input;

