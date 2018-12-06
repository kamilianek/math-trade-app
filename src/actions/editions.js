import {
  RECEIVE_ERROR_EDITIONS,
  REQUEST_EDITIONS,
  INVALIDATE_EDITIONS,
  RECEIVE_EDITIONS,
  CREATE_EDITION,
  EDIT_EDITION,
  CLOSE_EDITION,
  JOIN_EDITION,
  REOPEN_EDITION,
  PUBLISH_EDITION,
  CANCEL_EDITION,
} from '../reducers/editions';

import {
  UPDATE_MODERATOR_RESULTS_STATUS,
} from '../reducers/moderatorResults';

import editionsApi from '../api/editions';

const VALIDATE_TIME = 1000 * 60 * 5;
const FETCHING_TIMEOUT = 1000 * 32;


function requestEditions(editionId) {
  return {
    type: REQUEST_EDITIONS,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidateEditions() {
  return {
    type: INVALIDATE_EDITIONS,
    timestamp: Date.now(),
  };
}

function receiveEditions(editions) {
  return {
    type: RECEIVE_EDITIONS,
    timestamp: Date.now(),
    editions,
  };
}

function receiveErrorEditions() {
  return {
    type: RECEIVE_ERROR_EDITIONS,
    timestamp: Date.now(),
  };
}


function fetchEditions() {
  return (dispatch, getState) => {
    dispatch(requestEditions());
    return editionsApi.fetchEditions(getState().auth.apiUrl, getState().auth.token)
      .then((editions) => {
        dispatch(receiveEditions(editions));
      }, (error) => {
        dispatch(receiveErrorEditions());
        throw error;
      });
  };
}


function shouldFetchEditions(editions) {
  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = editions;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT));
}

export function fetchEditionsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEditions(getState().editions)) {
      return dispatch(fetchEditions());
    }

    return Promise.resolve('There is no need of fetch');
  };
}


export function createEdition(name, description, endDate, maxParticipants) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;

    return editionsApi.createEdition(apiUrl, token, {
      name,
      description,
      endDate,
      maxParticipants,
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: CREATE_EDITION,
          edition: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

export function editEdition(id, name, description, endDate, maxParticipants) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    return editionsApi.editEdition(apiUrl, token, id, {
      name,
      description,
      endDate,
      maxParticipants,
    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: EDIT_EDITION,
          edition: response,
        });
      }, (error) => {
        throw error;
      });
  };
}


export function closeEdition(id) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    return editionsApi.resolveEdition(apiUrl, token, id)
      .then((response) => {
        console.log('response: ', response);
        dispatch({
          type: CLOSE_EDITION,
          id,
          edition: response,
        });
      }, (error) => {
        throw error;
      });
  };
}


export function reopenEdition(id, date) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const endDate = { endDate: date };
    return editionsApi.reopenEdition(apiUrl, token, id, endDate)
      .then((response) => {
        dispatch({
          type: REOPEN_EDITION,
          id,
          edition: response,
        });
        dispatch({
          type: UPDATE_MODERATOR_RESULTS_STATUS,
          editionId: id,
          status: 'OPENED',
        });
      }, (error) => {
        throw error;
      });
  };
}


export function publishEdition(id) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;

    return editionsApi.publishEdition(apiUrl, token, id)
      .then((response) => {
        dispatch({
          type: PUBLISH_EDITION,
          id,
          edition: response,
        });
        dispatch({
          type: UPDATE_MODERATOR_RESULTS_STATUS,
          editionId: id,
          status: 'PUBLISHED',
        });
      }, (error) => {
        throw error;
      });
  };
}


export function cancelEdition(id) {
  return async (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;

    return editionsApi.cancelEdition(apiUrl, token, id)
      .then((response) => {
        dispatch({
          type: CANCEL_EDITION,
          id,
          edition: response,
        });
        dispatch({
          type: UPDATE_MODERATOR_RESULTS_STATUS,
          editionId: id,
          status: 'CANCELLED',
        });
      }, (error) => {
        throw error;
      });
  };
}


export function joinEdition(id) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;

    return editionsApi.joinEdition(apiUrl, token, id)
      .then((response) => {
        dispatch({
          type: JOIN_EDITION,
          id,
          edition: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

export default {
  fetchEditionsIfNeeded,
  createEdition,
  editEdition,
  closeEdition,
  joinEdition,
  reopenEdition,
  publishEdition,
  cancelEdition,
};
