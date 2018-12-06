// import {
//   REQUEST_MODERATOR_RESULTS,
//   RECEIVE_MODERATOR_RESULTS,
//   RECEIVE_ERROR_MODERATOR_RESULTS,
//   INVALIDATE_MODERATOR_RESULTS,
// } from '../reducers/moderatorResults';

import {
  REQUEST_USER_RESULTS,
  RECEIVE_USER_RESULTS,
  RECEIVE_ERROR_USER_RESULTS,
  INVALIDATE_USER_RESULTS,
  RATE_RESULT,
} from '../reducers/results';

import resultsApi from '../api/results';

const VALIDATE_TIME_USER_RESULTS = 1000 * 60 * 10;
const FETCHING_TIMEOUT_USER_RESULTS = 1000 * 32;


// const VALIDATE_TIME_MODERATOR_RESULTS = 1000 * 60 * 10;
// const FETCHING_TIMEOUT_MODERATOR_RESULTS = 1000 * 32;


function requestResults(editionId) {
  return {
    type: REQUEST_USER_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidateResults(editionId) {
  return {
    type: INVALIDATE_USER_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function receiveResults(editionId, result) {
  return {
    type: RECEIVE_USER_RESULTS,
    timestamp: Date.now(),
    editionId,
    result,
  };
}

function receiveErrorResults(editionId) {
  return {
    type: RECEIVE_ERROR_USER_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function fetchResults(editionId) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    dispatch(requestResults(editionId));
    return resultsApi.fetchResults(apiUrl, token, editionId)
      .then((response) => {
        dispatch(receiveResults(editionId, response));
      }, (error) => {
        dispatch(receiveErrorResults(editionId));
        throw error;
      });
  };
}

function shouldFetchResults(results) {
  if (!results) {
    return true;
  }

  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = results;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME_USER_RESULTS))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT_USER_RESULTS));
}

export function fetchUserResultsIfNeeded(editionId) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState().results.resultsByEdition[editionId])) {
      return dispatch(fetchResults(editionId));
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function rateResult(editionId, resultId, rate, comment) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const rateData = {
      rate,
      comment,
    };

    return resultsApi.rateResult(apiUrl, token, resultId, rateData)
      .then((response) => {
        dispatch({
          type: RATE_RESULT,
          editionId,
          rate: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

export default {
  fetchUserResultsIfNeeded,
  rateResult,
};
