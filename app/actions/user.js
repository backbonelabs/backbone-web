import { get } from 'axios';
import * as authActions from './auth';
import store from '../store';
import { FETCH_USER } from './types';

export const fetchUser = () => ({
  type: FETCH_USER,
  payload() {
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
      throw new Error(err.response.data.error || err.message);
    });
  },
});
