import { post } from 'axios';
import { browserHistory } from 'react-router';
import {
  LOGIN_USER,
  AUTHENTICATED,
  LOGOUT,
  IN_PROGRESS,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  AUTH_ERROR,
  CLEAR_ERRORS,
 } from '../actions/types';

export const inProgress = () => ({ type: IN_PROGRESS });
export const loginUser = payload => ({ type: LOGIN_USER, payload });
export const isAuthenticated = () => ({ type: AUTHENTICATED });
export const loginError = payload => ({ type: LOGIN_ERROR, payload });
export const signupError = payload => ({ type: SIGNUP_ERROR, payload });
export const authError = payload => ({ type: AUTH_ERROR, payload });
export const clearErrors = () => ({ type: CLEAR_ERRORS });

export const logOut = () => {
  localStorage.removeItem('jwt');
  browserHistory.push('/');
  return { type: LOGOUT };
};

export const login = user => (dispatch) => {
  dispatch(inProgress());
  return post('/auth/login', user)
    .then((res) => {
      // save token in localStorage
      const token = res.data.token;
      localStorage.setItem('jwt', token);
      // login user and redirect home
      dispatch(loginUser(res.data.user));
      browserHistory.push('/');
    })
    .catch((err) => {
      if (err.response.status === 401) {
        return dispatch(loginError(err.response.data.error));
      }
    });
};

export const signup = user => (dispatch) => {
  dispatch(inProgress());
  return post('/auth/signup', user)
    .then((res) => {
      // save token in localStorage
      const token = res.data.token;
      localStorage.setItem('jwt', token);
      // login user and redirect home
      dispatch(loginUser(res.data.user));
      browserHistory.push('/');
    })
    .catch((err) => {
      if (err.response.status === 400) {
        return dispatch(signupError(err.response.data.error));
      }
    });
};
