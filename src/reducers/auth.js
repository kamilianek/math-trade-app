const INITIAL_STATE = {
  apiUrl: 'https://mathtrade.api.url.com/api/v1',
  token: null, // TODO: null token on initial state
  tokenData: [],
  loginData: {
    username: null,
  },
};

const LOGIN_FINISHED = 'LOGIN_FINISHED';
const SIGN_OUT_FINISHED = 'SIGN_OUT_FINISHED';

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN_FINISHED':
      return {
        ...state,
        token: action.token,
        tokenData: action.tokenData,
        loginData: action.loginData,
      };
    case 'SIGN_OUT_FINISHED':
      return {
        ...INITIAL_STATE,
      };
    case 'persist/REHYDRATE':
      return {
        ...state,
        apiUrl: 'https://mathtrade.api.url.com/api/v1',
      };
    default:
      return state;
  }
}

export {
  LOGIN_FINISHED,
  SIGN_OUT_FINISHED,
};
