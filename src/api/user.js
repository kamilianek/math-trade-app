import { handleResponse } from './utils';

function fetchUser(apiUrl, token, userId) {
  return fetch(`${apiUrl}/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching user'));
}

function fetchMyData(apiUrl, token) {
  return fetch(`${apiUrl}/api/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching my data'));
}

function editUserDetails(apiUrl, token, details) {
  return fetch(`${apiUrl}/api/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(details),
  })
    .then(response => handleResponse(response, 200, 'Updating account details'));
}


export default {
  fetchUser,
  fetchMyData,
  editUserDetails,
};
