import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import loggerMiddleware from './middleware/loggerMiddleware';

// define store middlewares as an array
export default [
  promiseMiddleware,
  thunk,
  loggerMiddleware
];
