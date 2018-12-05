import { SIGN_OUT_FINISHED } from './auth';

const INITIAL_STATE = {
  isFetchingSince: null,
  lastSuccessfulFetch: null,
  lastFailedFetch: null,
  didInvalidate: null,
  data: {},
};


export const REQUEST_USER_DETAILS = 'REQUEST_USER_DETAILS';
export const RECEIVE_USER_DETAILS = 'RECEIVE_USER_DETAILS';
export const RECEIVE_ERROR_USER_DETAILS = 'RECEIVE_ERROR_USER';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
export const INVALIDATE_USER_DETAILS = 'INVALIDATE_USER_DETAILS';


export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_OUT_FINISHED:
      return {
        ...INITIAL_STATE,
      };
    case RECEIVE_ERROR_USER_DETAILS:
      return {
        ...state,
        isFetchingSince: null,
        lastFailedFetch: action.timestamp,
      };
    case REQUEST_USER_DETAILS:
      return {
        ...state,
        isFetchingSince: action.timestamp,
      };
    case INVALIDATE_USER_DETAILS:
      return {
        ...state,
        didInvalidate: true,
      };
    case RECEIVE_USER_DETAILS:
      return {
        ...state,
        isFetchingSince: null,
        didInvalidate: false,
        lastSuccessfulFetch: action.timestamp,
        data: action.data,
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}
