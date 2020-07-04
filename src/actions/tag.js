
import type { Action } from './types';

export const SET_DATA_ADD_TAG_STEP1 = 'SET_DATA_ADD_TAG_STEP1';

export function setDataAddTagStep1(data):Action {
  return {
    type: SET_DATA_ADD_TAG_STEP1,
    data,
  }
}
