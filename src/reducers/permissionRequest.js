const INITIAL_STATE = {
  isFetchingSince: null,
  lastSuccessfulFetch: null,
  lastFailedFetch: null,
  didInvalidate: false,
  request: {
    id: null,
    userId: null,
    reason: '',
    moderatorRequestStatus: null,
  },
};


export const RECEIVE_ERROR_PERMISSION_REQUEST = 'RECEIVE_ERROR_PERMISSION_REQUEST';
export const REQUEST_PERMISSION_REQUEST = 'REQUEST_PERMISSION_REQUEST';
export const RECEIVE_PERMISSION_REQUEST = 'RECEIVE_EDITIONS';
export const SEND_PERMISSION_REQUEST = 'CREATE_EDITION';


export default function permissionRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_ERROR_PERMISSION_REQUEST:
      return {
        ...state,
        isFetchingSince: null,
        lastFailedFetch: action.timestamp,
      };
    case REQUEST_PERMISSION_REQUEST:
      return {
        ...state,
        isFetchingSince: action.timestamp,
      };
    case RECEIVE_PERMISSION_REQUEST:
      return {
        ...state,
        isFetchingSince: null,
        didInvalidate: false,
        lastSuccessfulFetch: action.timestamp,
        request: action.request,
      };
    case SEND_PERMISSION_REQUEST:
      return {
        ...state,
        request: action.request,
      };
    default:
      return state;
  }
}
