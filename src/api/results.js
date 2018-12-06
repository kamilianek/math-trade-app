import { handleResponse } from './utils';


function fetchResults(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/results-user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching editions'));
}

function fetchModeratorResults(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/results-moderator`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching editions'));
}

function rateResult(apiUrl, token, resultId, rateData) {
  return fetch(`${apiUrl}/api/results/${resultId}/rate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(rateData),
  })
    .then(response => handleResponse(response, 200, 'Fetching editions'));
}

export default {
  fetchResults,
  fetchModeratorResults,
  rateResult,
};
