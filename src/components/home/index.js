
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Home from './home';
import { goToLocation } from '../../actions/map';

const mapStateToProps = (state) => ({
  location: state.map.location,
});

const mapDispatchToProps = (dispatch) => ({
  goToLocation: (location) => dispatch(goToLocation(location)),
});

export default Home; //connect(mapStateToProps, mapDispatchToProps)(Home //);