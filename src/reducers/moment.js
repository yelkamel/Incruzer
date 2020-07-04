
import type { Action } from '../actions/types';
import { SET_MOMENTS_INDEX } from '../actions/moment'
import { SET_MOMENTS_DATA }  from '../actions/moment'


const initialState = {
  displayTag: true,
};


export default function (state = initialState, action:Action) {
  switch(action.type) {
    case SET_MOMENTS_INDEX:
      return {
        ...state,
        index: action.index,
      }
    case SET_MOMENTS_DATA:
      return {
        ...state,
        moments: action.moments,
      }        
    default:
      return state
  }
}

