import { get } from 'axios';
import { browserHistory } from 'react-router';
import * as authActions from './auth';
import store from '../store';
import { FETCH_USER } from './types';

const fetchingUser = () => {
  const jwtToken = localStorage.getItem('sessionId');
  return get('/user', {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
  .then((res) => {
    // login user
    store.dispatch(authActions.loginUser(res.data.user));
  })
  .catch((err) => {
    if (err.response.statusText === 'Unauthorized') {
      store.dispatch(authActions.authError('Session has expired, Please Login again'));
    }
    return browserHistory.push('/login');
  });
};

export const fetchUser = () => ({ type: FETCH_USER, payload: fetchingUser });
