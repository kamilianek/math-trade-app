const INITIAL_STATE = {
  apiUrl: 'http://localhost:8081',
  token: null,
  tokenData: [],
  loginData: {
    username: null,
  },
  userExists: null,
  roles: [],
  permissionRequest: {
    isFetchingSince: null,
    lastSuccessfulFetch: null,
    lastFailedFetch: null,
    request: {
      id: null,
      userId: null,
      reason: '',
      moderatorRequestStatus: null,
    },
  },
};

export const LOGIN_FINISHED = 'LOGIN_FINISHED';
export const SIGN_OUT_FINISHED = 'SIGN_OUT_FINISHED';
export const REQUEST_PERMISSION_REQUEST_STATUS = 'REQUEST_PERMISSION_REQUEST_STATUS';
export const RECEIVE_ERROR_PERMISSION_REQUEST_STATUS = 'RECEIVE_ERROR_PERMISSION_REQUEST_STATUS';
export const RECEIVE_PERMISSION_REQUEST_STATUS = 'RECEIVE_PERMISSION_REQUEST_STATUS';
export const SEND_PERMISSION_REQUEST_STATUS = 'SEND_PERMISSION_REQUEST_STATUS';
export const INVALIDATE_PERMISSION_REQUEST_STATUS = 'INVALIDATE_PERMISSION_REQUEST_STATUS';
export const REGISTER_WITH_PASSWORD = 'REGISTER_WITH_PASSWORD';

const userRoles = {
  ADMIN: 'ROLE_ADMIN',
  MODERATOR: 'ROLE_MODERATOR',
  USER: 'ROLE_USER',
};
export const requestPermissionStatus = {
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED',
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_FINISHED:
      return {
        ...state,
        token: action.token,
        roles: action.roles,
        loginData: action.loginData,
        userExists: action.userExists,
      };
    case SIGN_OUT_FINISHED:
      return {
        ...INITIAL_STATE,
      };
    case REGISTER_WITH_PASSWORD:
      return {
        ...state,
        token: action.token,
        roles: action.roles,
        loginData: action.loginData,
        userExists: action.userExists,
      };
    case REQUEST_PERMISSION_REQUEST_STATUS:
      return {
        ...state,
        permissionRequest: {
          ...state.permissionRequest,
          isFetchingSince: action.timestamp,
        },
      };
    case INVALIDATE_PERMISSION_REQUEST_STATUS:
      return {
        ...state,
        permissionRequest: {
          ...state.permissionRequest,
          didInvalidate: true,
        },
      };
    case RECEIVE_PERMISSION_REQUEST_STATUS:
      return {
        ...state,
        roles: action.request.moderatorRequestStatus === requestPermissionStatus.ACCEPTED
          ? [...state.roles, userRoles.MODERATOR] : state.roles,
        permissionRequest: {
          ...state.permissionRequest,
          isFetchingSince: null,
          lastSuccessfulFetch: action.timestamp,
          request: action.request,
        },
      };
    case RECEIVE_ERROR_PERMISSION_REQUEST_STATUS:
      return {
        ...state,
        permissionRequest: {
          ...state.permissionRequest,
          isFetchingSince: null,
          lastFailedFetch: action.timestamp,
        },
      };
    case SEND_PERMISSION_REQUEST_STATUS:
      return {
        ...state,
        permissionRequest: {
          ...state.permissionRequest,
          request: action.request,
        },
      };
    case 'persist/REHYDRATE':
      return {
        ...state,
        apiUrl: 'http://localhost:8081',
      };
    default:
      return state;
  }
}
