'use strict';

import React, { Component } from 'react';
import { Image, Dimensions, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions,ActionConst } from 'react-native-router-flux';

import MomentHeader from './header';
import MomentFooter from './footer';
import HachTag from './hachTag';
import MediaContainer from './mediaContainer';
import styles from './style';
import Tag from '../tag';
import Modal from 'react-native-modalbox';
import AddTagStep1 from "../tag/newTag/step1"

class Moment extends Component {

  static propTypes = {
    displayHeader: React.PropTypes.bool,
    displayTag: React.PropTypes.bool,
    isMe: React.PropTypes.bool,
  };

  static defaultProps = {
    isMe: false,
  };

  constructor(props) {
    super(props);
    this.tagModal = null
    this.state ={
      displayHeader: 		true,
      displayHachTag: 		false,
      displayTag: 			true,
      displayFooter: 		true,
      followModalVisible : 	false,
      pause: 				false,
      repeat: 				false,
      isModalVisible:		false,
      momentDuration: 		false,
      momentTimerStart:		false,
    }

  }

  componentWillMount(){
      console.log("CURRENT TAG: " + JSON.stringify(this.props.moment.tags));
  }

  showHachTag = () => {
    const show =  !this.state.displayHachTag;
    this.setState({
        displayFooter: !show,
        displayHachTag: show,
    });
  }

  setRepeat = (value) => {
      console.log("=> Repeat: " + value);
      this.setState({
          repeat: value
      });
  }

  statusComponents = (show) => {
    this.setState({
      displayHeader: show,
      displayFooter: show,
      displayHachTag: false,
    });
  }

  addTag = ()  => {
    this.statusComponents(false);
    this.setState({
      	displayTag: false,
      	repeat: true,
    });
  }


  cancelledTag = () => {
    this.statusComponents(true);
    this.setState({
      	displayTag: false,
    });
  }

  setPause = (flag) => {

    this.setState({
      pause: flag,
    });
  }

  scrollNext = () => {
	  if( !this.state.isModalVisible )
	  {
		  this.props.scrollNext();
	  }
  }

  switchModalVisible = () => {
	  this.state.isModalVisible = true;
  }

  setMomentDuration = (momentDuration) => {
	  console.log("Moment index; setting duration : " + momentDuration);
	  this.setState({ momentDuration : momentDuration});
  }

  startMomentTimer = (momentTimerStart) => {
	  console.log("Triggering moment timer start");
	  this.setState({ momentTimerStart : momentTimerStart});
  }

  addNewTagStep = () => {
    this.statusComponents(false)
    this.props.setScrollEnabled(false)
    this.setState({
        repeat: true,
        isModalVisible: true
    })
    this.tagModal.open()
  }

closeNewTagModal = () => {
    this.tagModal.close()
    this.statusComponents(true)
    this.setState({
        repeat: false,
        isModalVisible: false
    })
    this.props.setScrollEnabled(true)

}

closeMoment = () => {
    Actions.pop()
}

  render() {
    const {
      moment:{
	    id,
        uri,
        type,
        tags,
        user,
        date,
        address
      }
    } = this.props;

    const {
      displayHeader,
      displayTag,
      displayFooter,
      displayHachTag
    } = this.state;

    return (
      <MediaContainer
        source={{uri: uri}}
        type={type}
        routeKey={this.props.routeKey}
        index={this.props.index}
        pause= {this.state.pause}
        repeat={this.state.repeat}
        scrollNext={this.scrollNext}
        setMomentDuration={this.setMomentDuration}
        startMomentTimer={this.startMomentTimer}
      >
      <View style={{flex:1, justifyContent:'space-between'
        }}>
        {
          displayTag &&
          <Tag
            tags={tags}
            momentId={id}
            setRepeat={this.setRepeat}
            showComponent={this.statusComponents}
          />
        }
        {
          displayHeader &&
          <MomentHeader
            isMe={this.props.isMe}
            user={user} date={date}
            address={address}
            closeMoment={this.closeMoment}
            isModalVisible={this.switchModalVisible}
            momentDuration={this.state.momentDuration}
            momentTimerStart={this.state.momentTimerStart}
            momentId={id}
          />
        }
        {
          displayHachTag &&
          <HachTag
            showHachTag={this.showHachTag}
            tags={tags}
          />
        }
        {
          displayFooter &&
              <MomentFooter
                addNewTagStep={this.addNewTagStep}
                showHachTag={this.showHachTag}
                user={user}
                addTag={this.addTag}
                tagsCount={tags.length}
                date={date}
                uri={uri}
                type={type}
                setPause={this.setPause}
                momentId={id}
              />
        }
        </View>
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
               momentId={parseInt(id)}
               goToNextStep={this.goToNextStep}>
            </AddTagStep1>
        </Modal>}
      </MediaContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  displayHeader: state.moment.momentDisplayHeader,
  displayTag: state.moment.displayTag,
});

export default connect(mapStateToProps, null)(Moment);
