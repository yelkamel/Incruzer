
import type { Action } from './types';


export const GO_TO_LOCATION = 'GO_TO_LOCATION';


export const goToLocation = (location) => ({
    type: GO_TO_LOCATION,
    location
  });
