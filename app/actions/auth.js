import { post } from 'axios';
import { browserHistory } from 'react-router';
import {
  LOGIN_USER,
  AUTHENTICATED,
  LOGOUT,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_REDIRECT,
  LOGIN,
  SIGN_UP,
 } from '../actions/types';
import store from '../store';

export const loginUser = payload => ({ type: LOGIN_USER, payload });
export const isAuthenticated = () => ({ type: AUTHENTICATED });
export const loginError = payload => ({ type: LOGIN_ERROR, payload });
export const signupError = payload => ({ type: SIGNUP_ERROR, payload });
export const authError = payload => ({ type: AUTH_ERROR, payload });
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const loginRedirect = payload => ({ type: LOGIN_REDIRECT, payload });

export const logOut = () => {
  localStorage.removeItem('sessionId');
  browserHistory.push('/');
  return { type: LOGOUT };
};

const loggingIn = (user, url) => post('/auth/login', user)
  .then((res) => {
    // save token in localStorage
    const token = res.data.token;
    localStorage.setItem('sessionId', token);
    // login user and redirect home
    store.dispatch(loginUser(res.data.user));
    browserHistory.push(url);
  })
  .catch((err) => {
    if (err.response.status === 401) {
      return store.dispatch(loginError(err.response.data.error));
    }
  });

export const login = (user, url) => ({ type: LOGIN, payload: loggingIn(user, url) });


const signingIn = user => post('/auth/signup', user)
  .then((res) => {
    // save token in localStorage
    const token = res.data.token;
    localStorage.setItem('sessionId', token);
    // login user and redirect home
    store.dispatch(loginUser(res.data.user));
    browserHistory.push('/');
  })
  .catch((err) => {
    if (err.response.status === 400) {
      return store.dispatch(signupError(err.response.data.error));
    }
  });

export const signup = user => ({ type: SIGN_UP, payload: signingIn(user) });
