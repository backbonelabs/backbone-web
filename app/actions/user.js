import { get } from 'axios';
import { browserHistory } from 'react-router';
import * as authActions from './auth';

export const fetchUser = () => (dispatch) => {
  const jwtToken = localStorage.getItem('jwt');
  dispatch(authActions.inProgress());
  return get('/user', {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
  .then((res) => {
    // login user
    dispatch(authActions.loginUser(res.data.user));
  })
  .catch((err) => {
    if (err.response.statusText === 'Unauthorized') {
      dispatch(authActions.authError('Session has expired, Please Login again'));
    }
    return browserHistory.push('/');
  });
};
