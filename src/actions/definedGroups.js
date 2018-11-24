import {
  RECEIVE_ERROR_DEFINED_GROUPS,
  REQUEST_DEFINED_GROUPS,
  INVALIDATE_DEFINED_GROUPS,
  RECEIVE_DEFINED_GROUPS,
  CREATE_DEFINED_GROUP,
  EDIT_DEFINED_GROUP,
  UPDATE_DEFINED_GROUP_CONTENT,
} from '../reducers/definedGroups';

const VALIDATE_TIME = 1000 * 60 * 5;
const FETCHING_TIMEOUT = 1000 * 32;

const myDefinedGroups = [
  {
    id: 10000,
    name: 'Group345',
    productsIds: [1003, 1004, 1005],
    groupIds: [],
  },
  {
    id: 10001,
    name: 'Group567',
    productsIds: [1005, 1006, 1007],
    groupIds: [10000],
  },
];


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
  return async (dispatch) => {
    dispatch(requestDefinedGroups(editionId));
    try {
      // const definedGroups = await api.definedGroups.fetchDefinedGroups(editionId)
      dispatch(receiveDefinedGroups(editionId, myDefinedGroups));
    } catch (e) {
      dispatch(receiveErrorDefinedGroups(editionId));
      throw e;
    }
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
  return async (dispatch) => {
    // const item = await api.definedGroups.createDefinedGroup()
    dispatch({
      type: CREATE_DEFINED_GROUP,
      editionId,
      group: {
        id: Math.floor(Math.random() * 1000000),
        name,
        productsIds: [],
        groupIds: [],
      },
    });
  };
}

export function editDefinedGroup(editionId, definedGroupId, name) {
  return async (dispatch, getState) => {
    // const item = await api.definedGroups.editDefinedGroup()
    // TODO: replace getState with returned value!!
    const group = getState().definedGroups.definedGroupsByEdition[editionId].groups
      .filter(g => g.id === definedGroupId)[0];
    dispatch({
      type: EDIT_DEFINED_GROUP,
      editionId,
      group: {
        ...group,
        name,
      },
    });
  };
}

export function updateDefinedGroupContent(editionId, definedGroupId, productsIds, groupIds) {
  return async (dispatch, getState) => {
    // const item = await api.definedGroups.updateDefinedGroupContents()
    // TODO: replace getState with returned value!!
    const group = getState().definedGroups.definedGroupsByEdition[editionId].groups
      .filter(g => g.id === definedGroupId)[0];
    dispatch({
      type: UPDATE_DEFINED_GROUP_CONTENT,
      editionId,
      group: {
        ...group,
        productsIds,
        groupIds,
      },
    });
  };
}


export default {
  fetchDefinedGroupsIfNeeded,
  createDefinedGroup,
  editDefinedGroup,
  updateDefinedGroupContent,
};
