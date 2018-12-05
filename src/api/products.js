import { handleResponse } from './utils';

function createItem(apiUrl, token, editionId, item, files) {
  const formData = new FormData();
  formData.append('item', JSON.stringify(item));
  files.forEach((element, index) => {
    console.log(`${index + 1}`, typeof element);
    formData.append(`${index + 1}`, element);
  });

  return fetch(`${apiUrl}/api/editions/${editionId}/items`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then(response => handleResponse(response, 200, 'Creating item'));
}

function editItem(apiUrl, token, itemId, item, files) {
  const formData = new FormData();
  formData.append('item', JSON.stringify(item));
  files.forEach((element, index) => formData.append(`${index + 1}`, element));
  return fetch(`${apiUrl}/api/items/${itemId}`, {
    method: 'PUT',
    headers: {
      Authorization: token,
    },
    body: formData,
  })
    .then(response => handleResponse(response, 200, 'Editing item'));
}

function fetchItem(apiUrl, token, itemId) {
  return fetch(`${apiUrl}/api/items/${itemId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching item'));
}

function assignItemToEdition(apiUrl, token, editionId, itemId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/items/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Assigning item to edition'));
}


function fetchAllItemsFromEdition(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching other user\'s items'));
}

function fetchMyItems(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/items/my`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching my items'));
}

function fetchMyNotAssignedItems(apiUrl, token) {
  return fetch(`${apiUrl}/api/items/not-assigned`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching my not assigned items'));
}


export default {
  createItem,
  editItem,
  fetchItem,
  assignItemToEdition,
  fetchAllItemsFromEdition,
  fetchMyItems,
  fetchMyNotAssignedItems,
};
