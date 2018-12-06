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


export default {
  fetchUser,
};
