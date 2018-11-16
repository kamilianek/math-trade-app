import {
  RECEIVE_ERROR_PREFERENCES,
  RECEIVE_PREFERENCES,
  REQUEST_PREFERENCES,
  INVALIDATE_PREFERENCES,
  UPDATE_PREFERENCE_FOR_PRODUCT,
} from '../reducers/preferences';

const VALIDATE_TIME = 1000 * 60 * 5;
const FETCHING_TIMEOUT = 1000 * 32;

const editionPreferences = [
  {
    id: 1,
    userId: 1,
    haveProductId: 1,
    wantedProductsIds: [1000, 1003, 1006],
    wantedDefinedGroupsIds: [10000],
  },
  {
    id: 2,
    userId: 1,
    haveProductId: 3,
    wantedProductsIds: [1002, 1003],
    wantedDefinedGroupsIds: [10000, 10001],
  },
];


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
  return async (dispatch) => {
    dispatch(requestPreferences(editionId));
    try {
      // const items = await api.myProducts.fetchPreferences(editionId)
      dispatch(receivePreferences(editionId, editionPreferences));
    } catch (e) {
      dispatch(receiveErrorPreferences(editionId));
    }
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

export function updatePreference(editionId, productId, wantedProductsIds, wantedDefinedGroupsIds) {
  return async (dispatch) => {
    // const items = await api.myProducts.updatePreference(editionId, preference)
    // TODO: replace getState with returned value!!
    dispatch({
      type: UPDATE_PREFERENCE_FOR_PRODUCT,
      editionId,
      preference: {
        id: Math.floor(Math.random() * 1000000),
        userId: 1,
        haveProductId: productId,
        wantedProductsIds,
        wantedDefinedGroupsIds,
      },
    });
  };
}

export default {
  fetchPreferencesIfNeeded,
  updatePreference,
};
