import {
  RECEIVE_ERROR_PREFERENCES,
  RECEIVE_PREFERENCES,
  REQUEST_PREFERENCES,
  INVALIDATE_PREFERENCES,
  UPDATE_PREFERENCE_FOR_PRODUCT,
} from '../reducers/preferences';

import preferencesApi from '../api/preferences';

const VALIDATE_TIME = 1000 * 60 * 5;
const FETCHING_TIMEOUT = 1000 * 32;


function requestPreferences(editionId) {
  return {
    type: REQUEST_PREFERENCES,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidatePreferences(editionId) {
  return {
    type: INVALIDATE_PREFERENCES,
    timestamp: Date.now(),
    editionId,
  };
}

function receivePreferences(editionId, preferences) {
  return {
    type: RECEIVE_PREFERENCES,
    timestamp: Date.now(),
    editionId,
    preferences,
  };
}

function receiveErrorPreferences(editionId) {
  return {
    type: RECEIVE_ERROR_PREFERENCES,
    timestamp: Date.now(),
    editionId,
  };
}

function fetchPreferences(editionId) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;

    dispatch(requestPreferences(editionId));
    return preferencesApi.fetchPreferences(apiUrl, token, editionId)
      .then((response) => {
        dispatch(receivePreferences(editionId, response));
      }, (error) => {
        dispatch(receiveErrorPreferences(editionId));
        throw error;
      });
  };
}

function shouldFetchPreferences(preferences) {
  if (!preferences) {
    return true;
  }

  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = preferences;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT));
}

export function fetchPreferencesIfNeeded(editionId) {
  return (dispatch, getState) => {
    if (shouldFetchPreferences(getState().preferences.preferencesByEdition[editionId])) {
      return dispatch(fetchPreferences(editionId));
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function updatePreference(editionId, itemId, wantedItemsIds, wantedDefinedGroupsIds) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const preference = {
      wantedItemsIds,
      wantedDefinedGroupsIds,
    };
    return preferencesApi.updatePreference(apiUrl, token, editionId, itemId, preference)
      .then((response) => {
        dispatch({
          type: UPDATE_PREFERENCE_FOR_PRODUCT,
          editionId,
          preference: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

export default {
  fetchPreferencesIfNeeded,
  updatePreference,
};
