const INITIAL_STATE = {
  resultsByEdition: {},
};

export const REQUEST_MODERATOR_RESULTS = 'REQUEST_MODERATOR_RESULTS';
export const RECEIVE_MODERATOR_RESULTS = 'RECEIVE_MODERATOR_RESULTS';
export const RECEIVE_ERROR_MODERATOR_RESULTS = 'RECEIVE_ERROR_MODERATOR_RESULTS';
export const INVALIDATE_MODERATOR_RESULTS = 'INVALIDATE_MODERATOR_RESULTS';

export default function moderatorResultsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_MODERATOR_RESULTS:
      return {
        ...state,
        resultsByEdition: {
          ...state.resultsByEdition,
          [action.editionId]: {
            ...state.resultsByEdition[action.editionId],
            didInvalidate: false,
            isFetchingSince: null,
            lastSuccessfulFetch: action.timestamp,
            result: action.result,
          },
        },
      };
    case REQUEST_MODERATOR_RESULTS:
      return {
        ...state,
        resultsByEdition: {
          ...state.resultsByEdition,
          [action.editionId]: {
            ...state.resultsByEdition[action.editionId],
            isFetchingSince: action.timestamp,
          },
        },
      };
    case RECEIVE_ERROR_MODERATOR_RESULTS:
      return {
        ...state,
        resultsByEdition: {
          ...state.resultsByEdition,
          [action.editionId]: {
            ...state.resultsByEdition[action.editionId],
            isFetchingSince: null,
            lastFailedFetch: action.timestamp,
          },
        },
      };
    case INVALIDATE_MODERATOR_RESULTS:
      return {
        ...state,
        resultsByEdition: {
          ...state.resultsByEdition,
          [action.editionId]: {
            ...state.resultsByEdition[action.editionId],
            didInvalidate: true,
          },
        },
      };
    default:
      return state;
  }
}
