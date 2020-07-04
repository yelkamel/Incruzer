
import React, { Component } 		from 'react';
import { View, StyleSheet, Image,
  TextInput, Text, TouchableOpacity, ScrollView,
  Dimensions, PanResponder, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {createResponder} from 'react-native-gesture-responder';
import { TEXT_PLACEHOLDER_TAG, CIRCLES_COLORS } from '../../../constants';
import MediaContainer 				from '../../moment/mediaContainer';
import theme 						from '../../../themes/base-theme';
import styles 						from './style';
import { WS_ADD_TAG } 				from '../../../constants';
import { protectedPost } 		from '../../../wsFetch';
import store from 'react-native-simple-store';

const closeImage 		= require('../../../../assets/icons/x.png');
const {width, height} 	= Dimensions.get('window');

export default class AddTagStep2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textInputColor: 'white',
      gestureState: {},
      thumbSize: 140,
      left: width / 2,
      top: height / 2 - height/10,
      fontSize: 24,
      rotate: 0,
      pageX: 0,
      pageY: 0,
      time: new Date().getTime(),
    }

  }

  componentWillMount() {
    this.gestureResponder = createResponder({
      // onStartShouldSetResponder: (evt, gestureState) => true,
      // onStartShouldSetResponderCapture: (evt, gestureState) => true,
       onMoveShouldSetResponder: (evt, gestureState) => true,
      // onMoveShouldSetResponderCapture: (evt, gestureState) => true,

      onResponderMove: (evt, gestureState) => {
        let thumbSize 		  = this.state.thumbSize;
        let previousThumbSize = thumbSize;

        let diffX = gestureState.moveX - gestureState.previousMoveX;
        let diffY = gestureState.moveY - gestureState.previousMoveY;

        let {left, top, fontSize} = this.state;

        previousLeft = left;
        previousTop  = top;
        left 		+= diffX;
        top 		+= diffY;

        this.setState({
          pageX: evt.nativeEvent.pageX,
          pageY: evt.nativeEvent.pageY,
        });

        if (gestureState.numberActiveTouches == 2)
        {
          if (gestureState.pinch && gestureState.previousPinch)
          {
            thumbSize *= (gestureState.pinch / gestureState.previousPinch);
            let diffThumbSize = thumbSize - previousThumbSize;
            /*if ( diffThumbSize < 2 && diffThumbSize > 0 ) {
              this.handleTouches(evt.nativeEvent);
            }*/
          }
        }
        let limitThumbSize = thumbSize;
        if (this.state.rotate == 45 || this.state.rotate == 135
         || this.state.rotate == 225 || this.state.rotate == 315) {
          limitThumbSize = thumbSize * 1.414;
        }
        let limitRight 	= left + limitThumbSize/2;
        let limitLeft 	= left - limitThumbSize/2;
        let limitTop 	= top  + limitThumbSize/2;
        let limitBottom = top  - limitThumbSize/2;

        fontSize *= thumbSize/previousThumbSize;

        if ( limitRight  <= width
          && limitLeft 	 >= 0
          && limitTop 	 <= height - height/7
          && limitBottom >= -thumbSize/4) {
          this.setState({
            gestureState: {
              ...gestureState
            },
            left, top, thumbSize, fontSize
          });
        }
      },
      onResponderTerminationRequest: (evt, gestureState) => true,
      onResponderRelease: (evt, gestureState) => {
        this.setState({
          gestureState: {
            ...gestureState
          }
        });
      },
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: 		(evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: 	(evt, gestureState) => true,
      onMoveShouldSetPanResponder: 			(evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: 	(evt, gestureState) => true,
      onPanResponderMove: 					(event, gestureState) => {
        this.handleTouches(event.nativeEvent);
      }
    });
  }

  toDeg (deg) {
    return deg * 180 / Math.PI
  }

  angle (x, y)
  {

    let deg = this.toDeg(Math.atan2(
        y,
        x,
      )
    );
    if ( Math.abs(deg) >= 45 ) {
      deg = this.state.rotate + 45;
      if (deg >= 360) {
        deg -= 360;
      }
      return deg;
    }
    return this.state.rotate;
  }

  handleTouches(evt) {

    let delta = new Date().getTime() - this.state.time;
    if(delta > 100 ) {
      this.setState({
          time: new Date().getTime(),
          rotate: this.angle(
              evt.pageX - this.state.pageX,
              evt.pageY - this.state.pageY,
            ),
        });
    }
  }

  rotate(value) {
    this.setState({ rotate: this.state.rotate + value });
  }

  onSendTagSuccess = (responseData) => {
    if ( typeof responseData.id !== 'undefined' )
    {
        Alert.alert(
              '',
              'Commentaire ajouté.',
              [
                { text: 'Fermer', onPress: () => {
                    this.props.closeNewTagModal()
                }},
              ]
            );
    }
    else
    {
        console.log("Error: responseData undefined when sending tag");
    }
  }

  onSendTagFail = (responseData) => {
    console.error(error);
  }

  sendTag = () => {
    Alert.alert(
      '',
      'Commentaire ajouté.',
      [
        { text: 'Fermer', onPress: () => {
            this.props.closeNewTagModal()
        }},
      ]
    );
/*
       var structToSend ={
         "id":"36",
         "date":"05/07/2017 12:08:28 PM",
         "user":{
            "id":"1",
            "email":"belzouz@incruizer.com",
            "picture":"http://buddle.mila.celaneo.com/upload/users/1.jpeg",
            "name":"Danny Gerdif",
            "snapshot":"belzouz",
            "type":0,
            "description":"Letâs Cruise",
            "website":"www.mysite.com",
            "followers":[],
            "following":[],
            "moments":[]
         },
         "comment":this.props.hashTagText,
         "left":this.state.left,
         "top":this.state.top,
         "style":{
            "color":this.state.textInputColor,
            "fontSize":this.state.fontSize
         },
         "rotate":"0deg"
      }
      store.push('localTags', structToSend)
	  console.log("Let post a tag !" + JSON.stringify(structToSend));
      this.props.closeNewTagModal()

      var structToSend = {
        text  : this.props.hashTagText,
        size  : this.state.fontSize,
        color : this.state.textInputColor,
        top   : this.state.top,
        left  : this.state.left,
        angle : '0',
      };
      var targetUrl = WS_ADD_TAG + this.props.momentId;

      protectedPost(
          targetUrl,
          structToSend,
          this.onSendTagSuccess,
          this.onSendTagFail
      );
      */
  }

  setTextInputColor(color) {
    this.setState({ textInputColor: color });
  }

    getCirclesColorsList() {
      return CIRCLES_COLORS.map( (color, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => this.setTextInputColor(color) }>
              <View key={key} style={[{backgroundColor: color}, styles.circle]}>
              </View>
            </TouchableOpacity>
          )
      });
    }

  render() {
    const thumbSize = this.state.thumbSize;
    return (
    <View style={{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }}>

          <View
            style={{flex: 1, backgroundColor: 'transparent', padding: 20, alignItems: 'center', justifyContent: 'center'}}
            {...this.gestureResponder}
            >
            <View
              style={{
                width: thumbSize,
                height: thumbSize,
                position: 'absolute',
                left: this.state.left - thumbSize/2,
                top: this.state.top - thumbSize/2,
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ rotate: String(this.state.rotate) + 'deg'}],
              }}
              pointerEvents='none'
              >
              <Text style={{
               /* width: thumbSize,
                height: thumbSize,*/
                fontSize: this.state.fontSize,
                fontWeight: 'bold',
                padding: 0,
                color: this.state.textInputColor,
            }}>{this.props.hashTagText}</Text>
            </View>
          </View>

            <View  style={styles.rightContainer}>
                <TouchableOpacity onPress={ () =>
                  this.props.closeNewTagModal() }>
                  <View style={styles.touchableIconClose}>
                    <Image source={closeImage} style={theme.iconClose} />
                  </View>
                </TouchableOpacity>
                  <View style={styles.circlesContainer}>
                      {this.getCirclesColorsList()}
                  </View>
            </View>

            <View style={styles.sendTagView}>
            <TouchableOpacity onPress={ () => this.sendTag() }>
              <View style={styles.tagContent}>
                <Image
                  style={styles.validationButton}
                  source={
                    require('../../../../assets/icons/validation.png')
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
      </View>

    );
  }
}

/*
const mapStateToProps = (state) => ({
  dataAddTagStep1: state.tag.dataAddTagStep1,
  index: state.moment.index,
});

const bindAction = (dispatch) => ({
  //setDataAddTagStep1: (data) => dispatch(setDataAddTagStep1(data))
});

export default connect(mapStateToProps, bindAction)(AddTagStep2);
*/
