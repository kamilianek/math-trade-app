import {
  RECEIVE_ERROR_OTHER_ASSIGNED_PRODUCTS,
  REQUEST_OTHER_ASSIGNED_PRODUCTS,
  INVALIDATE_OTHER_ASSIGNED_PRODUCTS,
  RECEIVE_OTHER_ASSIGNED_PRODUCTS,
} from '../reducers/otherAssignedProducts';

import productsApi from '../api/products';

const VALIDATE_TIME = 1000 * 60 * 3;
const FETCHING_TIMEOUT = 1000 * 32;


function requestOtherAssignedProducts(editionId) {
  return {
    type: REQUEST_OTHER_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
    editionId,
  };
}

function receiveOtherAssignedProducts(editionId, items) {
  return {
    type: RECEIVE_OTHER_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
    editionId,
    items,
  };
}

function receiveErrorOtherAssignedProducts(editionId) {
  return {
    type: RECEIVE_ERROR_OTHER_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
    editionId,
  };
}


function fetchOtherAssignedProducts(editionId) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;

    dispatch(requestOtherAssignedProducts(editionId));

    return productsApi.fetchAllItemsFromEdition(apiUrl, token, editionId)
      .then((response) => {
        dispatch(receiveOtherAssignedProducts(editionId, response));
      }, (error) => {
        dispatch(receiveErrorOtherAssignedProducts(editionId));
        throw error;
      });
  };
}

function shouldFetchOtherAssignedProducts(products) {
  if (!products) {
    return true;
  }

  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = products;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT));
}

export function fetchOtherAssignedProductsIfNeeded(editionId) {
  return (dispatch, getState) => {
    if (shouldFetchOtherAssignedProducts(
      getState().otherAssignedProducts.productsByEdition[editionId],
    )) {
      return dispatch(fetchOtherAssignedProducts(editionId));
    }

    return Promise.resolve('There is no need of fetch');
  };
}


export default {
  fetchOtherAssignedProductsIfNeeded,
};
