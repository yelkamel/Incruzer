
import type { Action } from './types';

export const CLOSE_MODAL_PROFILE = 'CLOSE_MODAL_PROFILE';
export const OPEN_MAP_PROFILE = 'CLOSE_MODAL_PROFILE';


export const closeModal = (close) => ({
    type: CLOSE_MODAL_PROFILE,
    close,
  })
