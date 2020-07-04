
import React, { Component } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  Keyboard,
 TouchableOpacity,
 ScrollView,
 Alert,
 Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';

import MediaContainer from '../../moment/mediaContainer';
import { TEXT_PLACEHOLDER_TAG, CIRCLES_COLORS } from '../../../constants';
import theme from './../../../themes/base-theme';
import styles from './style';
import AddTagStep2 from "./step2"

const closeImage = require('../../../../assets/icons/x.png');


/**
 *
 */
export default class AddTagStep1 extends Component {

  static propTypes = {
    displayAddTagStep1: React.PropTypes.bool,
    cancelledTag: React.PropTypes.func,
    addTagStep2: React.PropTypes.func,
    uri: React.PropTypes.string,
    momentId: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      displayKeyboard: true,
      isStep2: false
    }
  }

  componentWillUnmount() {
    Keyboard.dismiss();

  }


  handleLoosingFocus() {
    if ( this.state.text != '' )
	{
	    //Keyboard.dismiss();
        this.setState({
            isStep2: true
        })
        //Actions.addTagStep2({ uri: this.props.uri, types: this.props.types });
    }
  }


  gotToNextStep = () => {
    if ( this.state.text != '' ) {

      Keyboard.dismiss();
      this.setState({
          isStep2: true
      })
    //  Actions.addTagStep2({ uri: this.props.uri, types: this.props.types, momentId: this.props.momentId });
    } else {
      Keyboard.dismiss();
      Alert.alert(
        'Erreur',
        'Tu dois indiquer un texte pour ajouter ton tag',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      );
    }

  }

  render() {

      if (this.state.isStep2){
          return (<AddTagStep2
             types={this.props.type}
             momentId={this.props.momentId}
             closeNewTagModal={this.props.closeNewTagModal}
             hashTagText={this.state.text}>
        </AddTagStep2>)
      }
      else {
      return (
        <View style={{
          height: Dimensions.get('window').height,
          //paddingBottom: 20,
        }}>

            <TouchableOpacity style={styles.container}
                onPress={() => { this.handleLoosingFocus(); } } >
            <View onPress={() => { this.handleLoosingFocus();  } } >
              <View></View>
              <View style={styles.textInputContainer}>
                <TextInput
                  onSubmitEditing={
                    () => {
                      this.gotToNextStep()
                    }
                  }
                  autoFocus={true}
                  onFocus={() => Keyboard.dismiss}
                  onChangeText={(text) => this.setState({text})}
                  returnKeyType = {"done"}
                  keyboardDismissMode="on-drag"
                  value={this.state.text}
                  style={[{color: 'white'}, styles.textPlaceholder]}
                  //multiline={true}
                  placeholderTextColor={'#CECECE'}
                  placeholderStyle={{ color: "#CECECE", fontSize: 14, fontFamily: 'HelveticaNeue' }}
                  placeholder={TEXT_PLACEHOLDER_TAG}
                />
              </View>

            </View>
            </TouchableOpacity>
            <KeyboardSpacer onToggle={
                () => this.setState({ displayKeyboard: true })
              }
            />
        </View>
      );
    }
  }
}
