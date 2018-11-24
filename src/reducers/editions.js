/**
 * Created by kamilianek on 05.11.18.
 */
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

export default function editionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
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
      return {
        ...state,
        items: state.items.map(edition => (edition.id === action.id ? {
          ...edition,
          status: 'CLOSED',
        } : edition)),
      };
    case JOIN_EDITION:
      return {
        ...state,
        items: state.items.map(edition => (edition.id === action.id ? {
          ...edition,
          participant: true,
          numberOfParticipants: edition.numberOfParticipants + 1,
        } : edition)),
      };
    default:
      return state;
  }
}
