
import type { Action } from '../actions/types';
import { SET_DATA_ADD_TAG_STEP1 } from '../actions/tag'


const initialState = {
  dataAddTagStep1: null,
};


export default function (state = initialState, action:Action) {
  switch(action.type) {
    case SET_DATA_ADD_TAG_STEP1:
      return {
        ...state,
        dataAddTagStep1: action.data,
      }   
    default:
      return state
  }
}

