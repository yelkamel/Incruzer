import {combineReducers} from 'redux';
import route from './route';
import moment from './moment';
import tag from './tag';
import profile from './profile';
import map from './map';

export default combineReducers({
  moment,
  tag,
  profile,
  map,
  route
});
