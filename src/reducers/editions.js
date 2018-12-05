import { SIGN_OUT_FINISHED } from './auth';

const INITIAL_STATE = {
  items: [],
  isFetchingSince: null,
  lastSuccessfulFetch: null,
  lastFailedFetch: null,
  didInvalidate: false,
};

export const RECEIVE_ERROR_EDITIONS = 'RECEIVE_ERROR_EDITIONS';
export const REQUEST_EDITIONS = 'REQUEST_EDITIONS';
export const INVALIDATE_EDITIONS = 'INVALIDATE_EDITIONS';
export const RECEIVE_EDITIONS = 'RECEIVE_EDITIONS';
export const CREATE_EDITION = 'CREATE_EDITION';
export const EDIT_EDITION = 'EDIT_EDITION';
export const CLOSE_EDITION = 'CLOSE_EDITION';
export const JOIN_EDITION = 'JOIN_EDITION';
export const REOPEN_EDITION = 'REOPEN_EDITION';
export const PUBLISH_EDITION = 'PUBLISH_EDITION';
export const CANCEL_EDITION = 'CANCEL_EDITION';

export default function editionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_OUT_FINISHED:
      return {
        ...INITIAL_STATE,
      };
    case CREATE_EDITION:
      return {
        ...state,
        items: [...state.items, action.edition],
      };
    case INVALIDATE_EDITIONS:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_EDITIONS:
      return {
        ...state,
        isFetchingSince: action.timestamp,
      };
    case RECEIVE_EDITIONS:
      return {
        ...state,
        isFetchingSince: null,
        didInvalidate: false,
        items: action.editions,
        lastSuccessfulFetch: action.timestamp,
      };
    case RECEIVE_ERROR_EDITIONS:
      return {
        ...state,
        isFetchingSince: null,
        lastFailedFetch: action.timestamp,
      };
    case EDIT_EDITION:
      return {
        ...state,
        items: [
          ...state.items.filter(edition => edition.id !== action.edition.id),
          action.edition,
        ],
      };
    case CLOSE_EDITION:
    case REOPEN_EDITION:
    case PUBLISH_EDITION:
    case CANCEL_EDITION:
    case JOIN_EDITION:
      return {
        ...state,
        items: state.items.map(edition => (edition.id === action.id ? action.edition : edition)),
      };

    default:
      return state;
  }
}
