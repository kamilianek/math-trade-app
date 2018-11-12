/**
 * Created by kamilianek on 05.11.18.
 */
const INITIAL_STATE = {
  items: [
    {
      name: 'Mathandel 621',
      description: 'this edition is very cool',
      endDate: '2019-11-03',
      maxParticipants: 12,
      numberOfParticipants: 1,
      id: 2,
      moderator: false,
      participant: true,
      status: 'PENDING',
    },
    {
      name: 'Mathandel 2',
      description: 'this edition is very cool',
      endDate: '2019-11-22',
      maxParticipants: 1,
      numberOfParticipants: 1,
      id: 3,
      moderator: true,
      participant: true,
      status: 'OPENED',
    },
  ],
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
    default:
      return state;
  }
}
