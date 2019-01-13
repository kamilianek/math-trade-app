import {
  RECEIVE_ERROR_DEFINED_GROUPS,
  REQUEST_DEFINED_GROUPS,
  INVALIDATE_DEFINED_GROUPS,
  RECEIVE_DEFINED_GROUPS,
  CREATE_DEFINED_GROUP,
  EDIT_DEFINED_GROUP,
  UPDATE_DEFINED_GROUP_CONTENT,
} from '../reducers/definedGroups';

import definedGroupsApi from '../api/definedGroups';

const VALIDATE_TIME = 1000 * 60 * 5;
const FETCHING_TIMEOUT = 1000 * 32;


function requestDefinedGroups(editionId) {
  return {
    type: REQUEST_DEFINED_GROUPS,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidateDefinedGroups(editionId) {
  return {
    type: INVALIDATE_DEFINED_GROUPS,
    timestamp: Date.now(),
    editionId,
  };
}

function receiveDefinedGroups(editionId, groups) {
  return {
    type: RECEIVE_DEFINED_GROUPS,
    timestamp: Date.now(),
    editionId,
    groups,
  };
}

function receiveErrorDefinedGroups(editionId) {
  return {
    type: RECEIVE_ERROR_DEFINED_GROUPS,
    timestamp: Date.now(),
    editionId,
  };
}


function fetchDefinedGroups(editionId) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    dispatch(requestDefinedGroups(editionId));
    return definedGroupsApi.fetchDefinedGroups(apiUrl, token, editionId)
      .then((response) => {
        dispatch(receiveDefinedGroups(editionId, response));
      }, (error) => {
        dispatch(receiveErrorDefinedGroups(editionId));
        throw error;
      });
  };
}


function shouldFetchDefinedGroups(definedGroup) {
  if (!definedGroup) {
    return true;
  }

  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = definedGroup;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT));
}

export function fetchDefinedGroupsIfNeeded(editionId) {
  return (dispatch, getState) => {
    if (shouldFetchDefinedGroups(getState().definedGroups.definedGroupsByEdition[editionId])) {
      return dispatch(fetchDefinedGroups(editionId));
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function createDefinedGroup(editionId, name) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const definedGroup = { name };
    return definedGroupsApi.createDefinedGroup(apiUrl, token, editionId, definedGroup)
      .then((response) => {
        dispatch({
          type: CREATE_DEFINED_GROUP,
          editionId,
          group: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

export function editDefinedGroup(editionId, definedGroupId, name) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const definedGroup = { name };

    return definedGroupsApi.editDefinedGroup(apiUrl, token, editionId, definedGroupId, definedGroup)
      .then((response) => {
        dispatch({
          type: EDIT_DEFINED_GROUP,
          editionId,
          group: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

export function updateDefinedGroupContent(editionId, definedGroupId, itemsIds, groupIds) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const definedGroup = { itemsIds, groupIds };

    return definedGroupsApi.updateDefinedGroupContent(
      apiUrl,
      token,
      editionId,
      definedGroupId,
      definedGroup,
    ).then((response) => {
      dispatch({
        type: UPDATE_DEFINED_GROUP_CONTENT,
        editionId,
        group: response,
      });
    }, (error) => {
      throw error;
    });
  };
}


export default {
  fetchDefinedGroupsIfNeeded,
  createDefinedGroup,
  editDefinedGroup,
  updateDefinedGroupContent,
};
