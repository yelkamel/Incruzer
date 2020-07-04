
export type Action = 
{ type: 'OPEN_DRAWER' } 
| { type: 'CLOSE_DRAWER' }
| { type: 'CLOSE_MODAL_PROFILE', close: bool }
| { type: 'GO_TO_LOCATION', location: object }
| { type: 'SET_MOMENTS_INDEX', index: number }
| { type: 'SET_MOMENTS_DATA',  moments: object }
| {type: 'SET_DATA_ADD_TAG_STEP1', data: object };

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;
