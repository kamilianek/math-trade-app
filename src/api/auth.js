import { handleResponse } from './utils';

function standardRegistration(apiUrl, userData) {
  return fetch(`${apiUrl}/api/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => handleResponse(response, 200, 'Standard registration'));
}

function standardLogin(apiUrl, userData) {
  return fetch(`${apiUrl}/api/auth/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => handleResponse(response, 200, 'Standard registration'));
}


export default {
  standardRegistration,
  standardLogin,
};
