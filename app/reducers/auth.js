const initialState = {
  user: {},
  inProgress: false,
  loginError: '',
  signupError: '',
  authError: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: payload,
        inProgress: false,
        loginError: '',
        signupError: '',
        authError: '',
      };
    case 'LOGOUT':
      return {
        ...state,
        user: {},
        inProgress: false,
        loginError: '',
        signupError: '',
        authError: '',
      };
    case 'IN_PROGRESS':
      return {
        ...state,
        inProgress: true,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: {},
        loginError: payload,
        inProgress: false,
      };
    case 'SIGNUP_ERROR':
      return {
        ...state,
        user: {},
        signupError: payload,
        inProgress: false,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: {},
        authError: payload,
        inProgress: false,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        signupError: '',
        loginError: '',
        authError: '',
      };
    default:
      return state;
  }
};
