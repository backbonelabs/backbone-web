import {
  LOGIN_USER,
  LOGOUT,
  LOGIN__START,
  LOGIN__ERROR,
  SIGN_UP__START,
  SIGN_UP__ERROR,
  CLEAR_ERRORS,
  LOGIN_REDIRECT,
  FETCH_USER__START,
  FETCH_USER__ERROR,
  REQUEST_RESET__START,
  REQUEST_RESET__ERROR,
  REQUEST_RESET,
  PASSWORD_RESET,
  PASSWORD_RESET__START,
  PASSWORD_RESET__ERROR,
 } from '../actions/types';

const authState = {
  user: {},
  authenticated: false,
  inProgress: false,
  loginError: {},
  signupError: {},
  fetchUserError: {},
  requestResetError: {},
  passwordResetError: {},
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
        requestResetError: {},
        passwordResetError: {},
        loginRedirectUrl: '/',
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
        requestResetError: {},
        passwordResetError: {},
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
        requestResetError: {},
        passwordResetError: {},
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
    case REQUEST_RESET__START:
      return {
        ...state,
        inProgress: true,
      };
    case REQUEST_RESET__ERROR:
      return {
        ...state,
        requestResetError: payload,
        inProgress: false,
      };
    case REQUEST_RESET:
      return {
        ...state,
        inProgress: false,
      };
    case PASSWORD_RESET:
      return {
        ...state,
        inProgress: false,
      };
    case PASSWORD_RESET__START:
      return {
        ...state,
        inProgress: true,
      };
    case PASSWORD_RESET__ERROR:
      return {
        ...state,
        inProgress: false,
        passwordResetError: payload,
      };
    default:
      return state;
  }
};
