import { handleResponse } from './utils';


function fetchEditions(apiUrl, token) {
  return fetch(`${apiUrl}/api/editions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching editions'));
}


function editEdition(apiUrl, token, editionId, editionData) {
  return fetch(`${apiUrl}/api/editions/${editionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(editionData),
  })
    .then(response => handleResponse(response, 200, 'Editing edition'));
}

function createEdition(apiUrl, token, editionData) {
  console.log(editionData);
  return fetch(`${apiUrl}/api/editions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(editionData),
  })
    .then(response => handleResponse(response, 200, 'Creating edition'));
}


function joinEdition(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/participants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Joining edition'));
}

function resolveEdition(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/resolve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Resolving edition'));
}

function publishEdition(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Publishing edition'));
}

function reopenEdition(apiUrl, token, editionId, endDate) {
  return fetch(`${apiUrl}/api/editions/${editionId}/re-open`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(endDate),
  })
    .then(response => handleResponse(response, 200, 'Reopening edition'));
}

function cancelEdition(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Cancelling edition'));
}

export default {
  fetchEditions,
  editEdition,
  joinEdition,
  resolveEdition,
  publishEdition,
  reopenEdition,
  cancelEdition,
  createEdition,
};
