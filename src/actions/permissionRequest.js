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


const VALIDATE_TIME = 1000 * 60 * 5;
const FETCHING_TIMEOUT = 1000 * 32;

const mockRequest = {
  id: 1289746,
  userId: 2,
  reason: 'That\'s why I should have moderator permission',
  moderatorRequestStatus: 'REJECTED',
};

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
  return async (dispatch) => {
    dispatch(requestPermissionRequest());
    try {
      // const definedGroups = await api.permissionRequest.fetchPermissionRequest()
      dispatch(receivePermissionRequest(mockRequest));
    } catch (e) {
      dispatch(receiveErrorPermissionRequest());
      throw e;
    }
  };
}

function shouldFetchPermissionRequest(permissionRequest) {
  const {
    isFetchingSince,
    lastSuccessfulFetch,
    request,
  } = permissionRequest;

  console.log('permissionRequest: ', permissionRequest);
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
      console.log('should fetch...');
      return dispatch(fetchPermissionRequest());
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function sendPermissionRequest(requestReason) {
  return async (dispatch) => {
    // TODO: replace getState with returned value!!
    // const permissionRequestStatus = await api.permissionRequest.fetchPermissionRequest()
    dispatch({
      type: SEND_PERMISSION_REQUEST_STATUS,
      timestamp: Date.now(),
      request: {
        id: 1289746,
        userId: 2,
        reason: requestReason,
        moderatorRequestStatus: 'PENDING',
      },
    });
  };
}

export default {
  fetchPermissionRequestStatusIfNeeded,
  sendPermissionRequest,
};
