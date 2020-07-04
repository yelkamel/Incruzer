
import type { Action } from '../actions/types';
import { GO_TO_LOCATION } from '../actions/map'

const initialState = {
  location: null
};

export default (state = initialState, action:Action) => {
  switch(action.type) {
    case GO_TO_LOCATION:
      return {
        ...state,
        location: action.location,
      }  
    default:
      return state
  }
}

