import { post, get } from 'axios';
import { browserHistory } from 'react-router';

export const inProgress = () => ({ type: 'IN_PROGRESS' });
export const loginUser = payload => ({ type: 'LOGIN_USER', payload });
export const loginError = payload => ({ type: 'LOGIN_ERROR', payload });
export const signupError = payload => ({ type: 'SIGNUP_ERROR', payload });
export const authError = payload => ({ type: 'AUTH_ERROR', payload });
export const clearErrors = () => ({ type: 'CLEAR_ERRORS' });

export const logOut = () => {
  localStorage.removeItem('jwt');
  browserHistory.push('/');
  return { type: 'LOGOUT' };
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

export const isAuthenticated = token => (dispatch) => {
  dispatch(inProgress());
  return get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    // login user
    dispatch(loginUser(res.data.user));
  })
  .catch((err) => {
    if (err.response.statusText === 'Unauthorized') {
      dispatch(authError('Session has expired, Please Login again'));
    }
    return browserHistory.push('/');
  });
};

