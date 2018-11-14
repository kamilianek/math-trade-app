const INITIAL_STATE = {
  apiUrl: 'https://mathtrade.api.url.com/api/v1',
  token: null, // TODO: null token on initial state
  tokenData: [],
  loginData: {
    username: null,
  },
  roles: ['admin', 'moderator', 'user'],
  permissionRequests: {
    isFetchingSince: null,
    lastSuccessfulFetch: null,
    lastFailedFetch: null,
    requestStatus: 'CLOSED',
    requestMessage: '',
    rejectReason: '',
  },
};

const LOGIN_FINISHED = 'LOGIN_FINISHED';
const SIGN_OUT_FINISHED = 'SIGN_OUT_FINISHED';
const REQUEST_PERMISSION_REQUEST_STATUS = 'REQUEST_PERMISSION_REQUEST_STATUS';
const RECEIVE_PERMISSION_REQUEST_STATUS = 'RECEIVE_PERMISSION_REQUEST_STATUS';

const userRoles = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
};
const requestPermissionStatus = {
  CLOSED: 'closed',
  PENDING: 'pending',
  REJECTED: 'rejected',
  ACCEPTED: 'accepted',
};

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
    case 'REQUEST_PERMISSION_REQUEST_STATUS':
      return {
        ...state,
        permissionRequests: {
          ...state.permissionRequests,
          isFetchingSince: action.timestamp,
        },
      };
    case 'RECEIVE_PERMISSION_REQUEST_STATUS':
      return {
        ...state,
        roles: action.requestStatus === requestPermissionStatus.ACCEPTED
          ? state.roles.push(userRoles.MODERATOR) : state.roles,
        permissionRequests: {
          ...state.permissionRequests,
          isFetchingSince: null,
          lastSuccessfulFetch: action.timestamp,
          rejectReason: action.rejectReason,
        },
      };
    case 'RECEIVE_ERROR_REQUEST_STATUS':
      return {
        ...state,
        permissionRequests: {
          isFetchingSince: null,
          lastFailedFetch: action.timestamp,
        },
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
  REQUEST_PERMISSION_REQUEST_STATUS,
  RECEIVE_PERMISSION_REQUEST_STATUS,
  requestPermissionStatus,
};
