
import type { Action } from './types';

export const SET_MOMENTS_INDEX = 'SET_MOMENTS_INDEX';
export const SET_MOMENTS_DATA  = 'SET_MOMENTS_DATA';

export function setMomentsIndex(index) {
  return {
    type: SET_MOMENTS_INDEX,
    index,
  }
}

export function setMomentsData(moments) {
  return {
    type: SET_MOMENTS_DATA,
    moments,
  }
}
