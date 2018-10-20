
const INITIAL_STATE = {
  apiUrl: 'https://mathtrade.api.url.com/api/v1',
  token: '9283423jh4g4jh2343jkg23k4234u23rd23',
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN_FINISHED':
      return {
        ...state,
        token: action.token,
      };
    case 'LOGOUT_FINISHED':
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
