import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { asyncActionMiddleware } from 'redux-async-action';
import { responsiveStoreEnhancer } from 'redux-responsive';
import reducers from './reducers';

export default createStore(
  reducers,
  compose(
    responsiveStoreEnhancer,
    applyMiddleware(asyncActionMiddleware, ReduxThunk),
  ),
);
