import {
  LOGIN_USER,
  AUTHENTICATED,
  LOGOUT,
  LOGIN__START,
  LOGIN__ERROR,
  SIGN_UP__START,
  SIGN_UP__ERROR,
  CLEAR_ERRORS,
  LOGIN_REDIRECT,
  FETCH_USER__START,
  FETCH_USER__ERROR,
 } from '../actions/types';

const authState = {
  user: {},
  authenticated: false,
  inProgress: false,
  loginError: {},
  signupError: {},
  fetchUserError: {},
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
        loginError: {},
        signupError: {},
        fetchUserError: {},
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
        loginError: {},
        signupError: {},
        fetchUserError: {},
        loginRedirectUrl: '/',
      };
    case LOGIN__START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN__ERROR:
      return {
        ...state,
        loginError: payload,
        inProgress: false,
      };
    case SIGN_UP__START:
      return {
        ...state,
        inProgress: true,
      };
    case SIGN_UP__ERROR:
      return {
        ...state,
        signupError: payload,
        inProgress: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loginError: {},
        signupError: {},
        fetchUserError: {},
      };
    case LOGIN_REDIRECT:
      return {
        ...state,
        loginRedirectUrl: payload,
      };
    case FETCH_USER__START:
      return {
        ...state,
        inProgress: true,
      };
    case FETCH_USER__ERROR:
      return {
        ...state,
        inProgress: false,
        fetchUserError: payload,
        authenticated: false,
      };
    default:
      return state;
  }
};
