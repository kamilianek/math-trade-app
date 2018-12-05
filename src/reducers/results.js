import { SIGN_OUT_FINISHED } from './auth';


const INITIAL_STATE = {
  resultsByEdition: {},
};

export const REQUEST_USER_RESULTS = 'REQUEST_USER_RESULTS';
export const RECEIVE_USER_RESULTS = 'RECEIVE_USER_RESULTS';
export const RECEIVE_ERROR_USER_RESULTS = 'RECEIVE_ERROR_USER_RESULTS';
export const INVALIDATE_USER_RESULTS = 'INVALIDATE_USER_RESULTS';
export const RATE_RESULT = 'RATE_RESULT';

export default function resultsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_OUT_FINISHED:
      return {
        ...INITIAL_STATE,
      };
    case RECEIVE_USER_RESULTS:
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
    case REQUEST_USER_RESULTS:
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
    case RECEIVE_ERROR_USER_RESULTS:
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
    case INVALIDATE_USER_RESULTS:
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
    case RATE_RESULT:
      return {
        ...state,
        resultsByEdition: {
          ...state.resultsByEdition,
          [action.editionId]: {
            ...state.resultsByEdition[action.editionId],
            result: {
              ...state.resultsByEdition[action.editionId].result,
              resultsToReceive:
                state.resultsByEdition[action.editionId].result.resultsToReceive.map((result) => {
                  if (result.id === action.rate.resultId) {
                    return ({
                      ...result,
                      rate: action.rate,
                    });
                  }

                  return result;
                }),
            },
          },
        },
      };
    default:
      return state;
  }
}
