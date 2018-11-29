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

const mockRequestsToverify = [
  {
    id: 1,
    userId: 2,
    reason: 'Donec velit libero, pretium id urna ut, elementum lacinia lorem. Mauris id est nec enim mollis ultrices ut vitae erat. Integer varius nulla et feugiat feugiat. Mauris nisi justo, eleifend sagittis erat pulvinar, porttitor suscipit mauris. Nulla facilisi. Mauris ut est condimentum, accumsan sem vitae, dapibus turpis. Donec vel leo purus.',
    moderatorRequestStatus: 'PENDING',
  },
  {
    id: 2,
    userId: 3,
    reason: 'Donec dolor dolor, pharetra nec tincidunt vitae, tincidunt id leo. Duis quis hendrerit leo, ac condimentum nulla.',
    moderatorRequestStatus: 'PENDING',
  },
];


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


export function fetchRequestsToVerify() {
  // await api.permissionRequest.fetchRequestsToVerify
  return Promise.resolve({ requests: mockRequestsToverify });
}

export default {
  fetchPermissionRequestStatusIfNeeded,
  sendPermissionRequest,
  fetchRequestsToVerify,
};
