import { handleResponse } from './utils';


function fetchMyPermissionRequest(apiUrl, token) {
  return fetch(`${apiUrl}/api/moderator-requests/my`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching permission request'));
}

function sendPermissionRequest(apiUrl, token, permissionRequestData) {
  return fetch(`${apiUrl}/api/moderator-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(permissionRequestData),
  })
    .then(response => handleResponse(response, 200, 'Sending moderator request'));
}

function fetchRequestsToVerify(apiUrl, token) {
  return fetch(`${apiUrl}/api/moderator-requests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching moderator requests'));
}

function resolveRequests(apiUrl, token, solutionData) {
  console.log('solutionData: ', solutionData);
  return fetch(`${apiUrl}/api/moderator-requests/resolve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(solutionData),
  })
    .then(response => handleResponse(response, 200, 'Resolving moderator requests'));
}


export default {
  fetchMyPermissionRequest,
  sendPermissionRequest,
  fetchRequestsToVerify,
  resolveRequests,
};
