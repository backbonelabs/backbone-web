import { post } from "axios";
import { push } from "react-router-redux";
import {
  LOGIN_USER,
  LOGOUT,
  CLEAR_ERRORS,
  LOGIN_REDIRECT,
  LOGIN,
  SIGN_UP,
  REQUEST_RESET,
  PASSWORD_RESET
} from "../actions/types";
import { store } from "../store";
import setAuthorizationToken from "../utils/setAuthorizationToken";

export const loginUser = payload => ({ type: LOGIN_USER, payload });
export const clearErrors = () => ({ type: CLEAR_ERRORS });
export const loginRedirect = payload => ({ type: LOGIN_REDIRECT, payload });

export const logOut = () => {
  localStorage.removeItem("sessionId");
  store.dispatch(push("/"));
  return { type: LOGOUT };
};

export const login = (user, url) => ({
  type: LOGIN,
  payload() {
    return post("/auth/login", user)
      .then(res => {
        // save token in localStorage
        const token = res.data.token;
        localStorage.setItem("sessionId", token);
        setAuthorizationToken(token);
        // login user and redirect home
        store.dispatch(loginUser(res.data.user));
        store.dispatch(push(url));
      })
      .catch(err => {
        throw new Error(err.response.data.error || err.message);
      });
  }
});

export const signup = user => ({
  type: SIGN_UP,
  payload() {
    return post("/auth/signup", user)
      .then(res => {
        // save token in localStorage
        const token = res.data.token;
        setAuthorizationToken(token);
        localStorage.setItem("sessionId", token);
        // login user and redirect home
        store.dispatch(loginUser(res.data.user));
        store.dispatch(push("/"));
      })
      .catch(err => {
        throw new Error(err.response.data.error || err.message);
      });
  }
});

export const requestReset = email => ({
  type: REQUEST_RESET,
  payload() {
    return post("/auth/request-reset", email).catch(err => {
      throw new Error(err.response.data.error || err.message);
    });
  }
});

export const passwordReset = (password, verifyPassword) => ({
  type: PASSWORD_RESET,
  payload() {
    const queryString = location.search;
    const regex = new RegExp("[\\?&]token=([^&#]*)");
    const results = regex.exec(queryString);
    const token = results
      ? decodeURIComponent(results[1].replace(/\+/g, " "))
      : undefined;
    const data = {
      token,
      password,
      verifyPassword
    };
    return post("/auth/password-reset", data).catch(err => {
      throw new Error(err.response.data.error || err.message);
    });
  }
});
