import { get, post } from 'axios';
import * as authActions from './auth';
import store from '../store';
import { FETCH_USER, UPDATE_USER } from './types';

export const fetchUser = () => ({
  type: FETCH_USER,
  payload() {
    return get('/user')
    .then((res) => {
      // login user
      store.dispatch(authActions.loginUser(res.data.user));
    })
    .catch((err) => {
      localStorage.removeItem('sessionId');
      throw new Error(err.response.data.error || err.message);
    });
  },
});

export const updateUser = user => ({
  type: UPDATE_USER,
  payload() {
    return post('/user', { user })
    .then((res) => {
      // update user
      store.dispatch(authActions.loginUser(res.data.user));
    })
    .catch((err) => {
      throw new Error(err.response.data.error || err.message);
    });
  },
});
