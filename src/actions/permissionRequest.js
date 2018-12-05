/**
 * Created by kamilianek on 23.11.18.
 */

import {
  REQUEST_PERMISSION_REQUEST_STATUS,
  RECEIVE_PERMISSION_REQUEST_STATUS,
  RECEIVE_ERROR_PERMISSION_REQUEST_STATUS,
  SEND_PERMISSION_REQUEST_STATUS,
  requestPermissionStatus,
} from '../reducers/auth';

import permissionRequestsApi from '../api/permissionResuest';


const VALIDATE_TIME = 1000 * 60 * 5;
const FETCHING_TIMEOUT = 1000 * 32;


function requestPermissionRequest() {
  return {
    type: REQUEST_PERMISSION_REQUEST_STATUS,
    timestamp: Date.now(),
  };
}


function receivePermissionRequest(permissionRequest) {
  return {
    type: RECEIVE_PERMISSION_REQUEST_STATUS,
    timestamp: Date.now(),
    request: permissionRequest,
  };
}

function receiveErrorPermissionRequest() {
  return {
    type: RECEIVE_ERROR_PERMISSION_REQUEST_STATUS,
    timestamp: Date.now(),
  };
}


function fetchPermissionRequest() {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;

    dispatch(requestPermissionRequest());
    return permissionRequestsApi.fetchMyPermissionRequest(apiUrl, token)
      .then((response) => {
        dispatch(receivePermissionRequest(response));
      }, (error) => {
        dispatch(receiveErrorPermissionRequest());
        throw error;
      });
  };
}

function shouldFetchPermissionRequest(permissionRequest) {
  const {
    isFetchingSince,
    lastSuccessfulFetch,
    request,
  } = permissionRequest;

  const status = request.moderatorRequestStatus;

  // not fetch if fetched but there is no request or status was accepted or rejected
  if (!isFetchingSince && lastSuccessfulFetch
    && (status === requestPermissionStatus.ACCEPTED
    || status === requestPermissionStatus.REJECTED)) {
    return false;
  }

  // fetch if wasn't fetched or is invalid
  if (
    !isFetchingSince && (!lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME))
  ) {
    return true;
  }

  // fetch if timeout
  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT));
}

export function fetchPermissionRequestStatusIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPermissionRequest(getState().auth.permissionRequest)) {
      return dispatch(fetchPermissionRequest());
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function sendPermissionRequest(reason) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const request = { reason };

    return permissionRequestsApi.sendPermissionRequest(apiUrl, token, request)
      .then((response) => {
        dispatch({
          type: SEND_PERMISSION_REQUEST_STATUS,
          timestamp: Date.now(),
          request: response,
        });
      }, (error) => {
        throw error;
      });
  };
}


export function fetchRequestsToVerify() {
  return (_, getState) => {
    const { apiUrl, token } = getState().auth;
    return permissionRequestsApi.fetchRequestsToVerify(apiUrl, token)
      .then(response => response, (error) => {
        throw error;
      });
  };
}

export function resolveModeratorRequests(acceptedRequestsIds, rejectedRequestsIds) {
  return (_, getState) => {
    const { apiUrl, token } = getState().auth;
    const solution = {
      acceptedRequestsIds,
      rejectedRequestsIds,
    };
    console.log('solution: ', solution);
    return permissionRequestsApi.resolveRequests(apiUrl, token, solution)
      .then(response => response, (error) => {
        throw error;
      });
  };
}

export default {
  fetchPermissionRequestStatusIfNeeded,
  sendPermissionRequest,
  fetchRequestsToVerify,
  resolveModeratorRequests,
};
