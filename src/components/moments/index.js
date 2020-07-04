import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { setMomentsIndex } from '../../actions/moment';
import { setMomentsData } from '../../actions/moment';
import Moment from '../moment';
import Spinner from '../common/spinner';
import { Animatable, View } from 'react-native-animatable';

import styles from './style';

class Moments extends Component {


  static propTypes = {
    index:  React.PropTypes.number,
    isUser: React.PropTypes.bool,
    markerMoments: React.PropTypes.array,
    isMe:   React.PropTypes.bool,
  };

  static defaultProps = {
    isMe: false,
  };

  constructor(props) {
    super(props);
    this.nbData = 0
    this.state = {
	  scrollEnabled:true,
      index: 1,
    }
  }

  onMomentumScrollEnd = async ( e, state, context ) => {
    try {
      if (state.index === this.nbData
          || state.index === 0) {
              Actions.pop()
          //await Actions.pop({ refresh: { cached : false } });
          //await Actions.home();
      } else {
        await this.setState({ index: state.index });
      }
    } catch(err) {
        console.log("Erreur à l'arriver à la fin de moments");
        Actions.pop()
    }
  };

  scrollNext = () => {
	try
	{
      	if ( (typeof this.props.markerMoments !== 'undefined' && this.state.index === this.nbData) || this.state.index === 0)
      	{
		  	Actions.pop({refresh: { previousMomentId: this.propsMarkerMoments[this.state.index].id }});
      	}
      	else
      	{
      		this._swiper.scrollBy(1, true);
      	}
    }
    catch(err)
    {
	    console.log("Catchin' error : " + err);
		Actions.pop();
    }
    console.log("Scroll next called");
  }

  setScrollEnabled = (value) => {
	  this.setState({
		  scrollEnabled : value
	  })
  }


  getList() {

    let momentTmp = []
    momentTmp = momentTmp.concat(this.props.markerMoments)

    let data =  momentTmp.map((value, key) => {
      return(
        <View key={key + 1}>
          <Moment
            isMe={this.props.isMe}
            moment={value}
            routeKey={key + 1}
            index={this.state.index}
			setScrollEnabled={this.setScrollEnabled}
            scrollNext={this.scrollNext}
          />
        </View>
      );
    });
    data.unshift(<View key={0}><Spinner /></View>);

    if ( typeof this.props.markerMoments !== "undefined" )
    {
	    data.push(<View key={this.props.markerMoments.length + 1}><Spinner /></View>);
    }



    this.nbData = data.length - 1

    return data;
  }

  getLength() {
    if (this.props.type === 'video') {
      return 10
    }
      return 4
  }

  render() {

    return(
      <Swiper
      	ref={component => this._swiper = component }
        index={this.state.index}
        loop={false}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        loadMinimal={true}
        loadMinimalSize={3}
        showsButtons={false}
        showsPagination={false}
		scrollEnabled={this.state.scrollEnabled}
        autoplay={false}
        autoplayTimeout={this.getLength()}
      >
        {this.getList()}
      </Swiper>
    )
  }
}

const bindAction = (dispatch) => ({
  setMomentsData: (moments) => dispatch(setMomentsData(moments)),
});

export default connect(null, bindAction)(Moments);
