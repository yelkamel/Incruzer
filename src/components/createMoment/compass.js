import React from 'react';
import {
  Image,
  View,
  Dimensions,
  AppState,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';


import { checkPermissions } from '../../helpers';
import Popup from '../common/popup';
import Authorize from '../common/authorize';
import Maps from './maps';
import styles from './style';
import theme from '../../themes/base-theme';
const {
  height: deviceHeight,
  width: deviceWidth
} = Dimensions.get("window");

export default class Compass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationPermission: false,
    };
  }

  async componentWillMount() {
    const response = await checkPermissions(['location']);
    this._updatePermissions(response.location);
  }

  _updatePermissions = (response) => {
    this.setState({ locationPermission: response.location });
  }

  render() {
    return (
        this.state.locationPermission !== "authorized" ?
        <Popup
          percent={1}
          percentHeight={0.5}
          close={this.props.displayCompass}
        >
          <Authorize
            _updatePermissions={
              (response) =>
              { this.setState({ locationPermission: response }) }
            }
            permission={'location'}
            message={'We need the location !'}
          />
        </Popup>
        :
        <Popup
          percent={0.7}
          percentHeight={0.7}
          close={this.props.displayCompass}
        >
          <Maps close={this.props.displayCompass} source={this.props.source} type={this.props.type} localHashtag={this.props.localHashtag}/>
        </Popup>

    );
  }
};
