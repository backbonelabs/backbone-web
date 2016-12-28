import {
  LOGIN_USER,
  AUTHENTICATED,
  LOGOUT,
  LOGIN_USER__START,
  LOGIN_ERROR,
  SIGNUP_ERROR,
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_REDIRECT,
 } from '../actions/types';

const authState = {
  user: {},
  authenticated: false,
  inProgress: false,
  loginError: '',
  signupError: '',
  authError: '',
  loginRedirectUrl: '/',
};

export default (state = authState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        authenticated: true,
        user: payload,
        inProgress: false,
        loginError: '',
        signupError: '',
        authError: '',
        loginRedirectUrl: '/',
      };
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: {},
        inProgress: false,
        loginError: '',
        signupError: '',
        authError: '',
        loginRedirectUrl: '/',
      };
    case LOGIN_USER__START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: payload,
        inProgress: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signupError: payload,
        inProgress: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: payload,
        inProgress: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        signupError: '',
        loginError: '',
        authError: '',
      };
    case LOGIN_REDIRECT:
      return {
        ...state,
        loginRedirectUrl: payload,
      };
    default:
      return state;
  }
};
