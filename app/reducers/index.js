import { combineReducers } from 'redux';
import { responsiveStateReducer } from 'redux-responsive';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  browser: responsiveStateReducer,
});

export default rootReducer;
