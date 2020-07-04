
import type { Action } from '../actions/types';
import { CLOSE_MODAL_PROFILE, OPEN_MAP_PROFILE } from '../actions/profile'


const initialState = {
  close: false,
  map: false
};

export default function (state = initialState, action:Action) {
  console.log(action);
  switch(action.type) {
    case CLOSE_MODAL_PROFILE:
      return {
        ...state,
        close: action.close,
      }
    default:
      return state
  }
}

