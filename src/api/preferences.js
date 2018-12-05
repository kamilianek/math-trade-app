import { handleResponse } from './utils';

function fetchPreferences(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/preferences`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching preferences'));
}

function updatePreference(apiUrl, token, editionId, itemId, preferenceData) {
  return fetch(`${apiUrl}/api/editions/${editionId}/items/${itemId}/preferences`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(preferenceData),
  })
    .then(response => handleResponse(response, 200, 'Updating preference'));
}


export default {
  fetchPreferences,
  updatePreference,
};
