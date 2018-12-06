import {
  REQUEST_MODERATOR_RESULTS,
  RECEIVE_MODERATOR_RESULTS,
  RECEIVE_ERROR_MODERATOR_RESULTS,
  INVALIDATE_MODERATOR_RESULTS,
} from '../reducers/moderatorResults';

import resultsApi from '../api/results';

const VALIDATE_TIME_MODERATOR_RESULTS = 1000 * 60 * 10;
const FETCHING_TIMEOUT_MODERATOR_RESULTS = 1000 * 32;


function requestModeratorResults(editionId) {
  return {
    type: REQUEST_MODERATOR_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidateModeratorResults(editionId) {
  return {
    type: INVALIDATE_MODERATOR_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function receiveModeratorResults(editionId, result) {
  return {
    type: RECEIVE_MODERATOR_RESULTS,
    timestamp: Date.now(),
    editionId,
    result,
  };
}

function receiveErrorModeratorResults(editionId) {
  return {
    type: RECEIVE_ERROR_MODERATOR_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function fetchModeratorResults(editionId) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    dispatch(requestModeratorResults(editionId));
    return resultsApi.fetchModeratorResults(apiUrl, token, editionId)
      .then((response) => {
        dispatch(receiveModeratorResults(editionId, response));
      }, (error) => {
        dispatch(receiveErrorModeratorResults(editionId));
        throw error;
      });
  };
}

function shouldFetchModeratorResults(results) {
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
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME_MODERATOR_RESULTS))
  ) {
    return true;
  }

  return !!(isFetchingSince && (
    (Date.now() - isFetchingSince) > FETCHING_TIMEOUT_MODERATOR_RESULTS)
  );
}

export function fetchModeratorResultsIfNeeded(editionId, forced) {
  return (dispatch, getState) => {
    if (forced
      || shouldFetchModeratorResults(getState().moderatorResults.resultsByEdition[editionId])) {
      return dispatch(fetchModeratorResults(editionId));
    }

    return Promise.resolve('There is no need of fetch');
  };
}


export default {
  fetchModeratorResultsIfNeeded,
};
