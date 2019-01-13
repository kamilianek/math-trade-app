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

function facebookRegistration(apiUrl, userData) {
  return fetch(`${apiUrl}/api/auth/facebookSignUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => handleResponse(response, 200, 'Facebook registration'));
}

function standardLogin(apiUrl, userData) {
  return fetch(`${apiUrl}/api/auth/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => handleResponse(response, 200, 'Standard login'));
}

function facebookLogin(apiUrl, fbToken) {
  return fetch(`${apiUrl}/api/auth/facebookSignIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fbToken),
  })
    .then(response => handleResponse(response, 200, 'Facebook login'));
}


export default {
  standardRegistration,
  facebookRegistration,
  standardLogin,
  facebookLogin,
};
