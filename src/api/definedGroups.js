import { handleResponse } from './utils';

function fetchDefinedGroups(apiUrl, token, editionId) {
  return fetch(`${apiUrl}/api/editions/${editionId}/defined-groups`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })
    .then(response => handleResponse(response, 200, 'Fetching defined groups'));
}


function createDefinedGroup(apiUrl, token, editionId, definedGroupData) {
  return fetch(`${apiUrl}/api/editions/${editionId}/defined-groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(definedGroupData),
  })
    .then(response => handleResponse(response, 200, 'Creating defined group'));
}


function editDefinedGroup(apiUrl, token, editionId, groupId, definedGroupData) {
  return fetch(`${apiUrl}/api/editions/${editionId}/defined-groups/${groupId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(definedGroupData),
  })
    .then(response => handleResponse(response, 200, 'Updating defined group name'));
}

function updateDefinedGroupContent(apiUrl, token, editionId, groupId, definedGroupData) {
  return fetch(`${apiUrl}/api/editions/${editionId}/defined-groups/${groupId}/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(definedGroupData),
  })
    .then(response => handleResponse(response, 200, 'Updating defined group content'));
}

export default {
  fetchDefinedGroups,
  createDefinedGroup,
  editDefinedGroup,
  updateDefinedGroupContent,
};
