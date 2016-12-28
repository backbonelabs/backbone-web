import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { asyncActionMiddleware } from 'redux-async-action';
import reducers from './reducers';

export default createStore(
  reducers,
  applyMiddleware(asyncActionMiddleware, ReduxThunk),
);
