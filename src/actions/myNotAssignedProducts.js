import {
  RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS,
  REQUEST_MY_NOT_ASSIGNED_PRODUCTS,
  INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS,
  RECEIVE_MY_NOT_ASSIGNED_PRODUCTS,
  UPDATE_MY_NOT_ASSIGNED_PRODUCT,
} from '../reducers/myNotAssignedProducts';

import productsApi from '../api/products';

const VALIDATE_TIME = 1000 * 60 * 10;
const FETCHING_TIMEOUT = 1000 * 32;

function requestMyNotAssignedProducts() {
  return {
    type: REQUEST_MY_NOT_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
  };
}

function invalidateMyNotAssignedProducts() {
  return {
    type: INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
  };
}

function receiveMyNotAssignedProducts(items) {
  return {
    type: RECEIVE_MY_NOT_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
    items,
  };
}

function receiveErrorMyNotAssignedProducts() {
  return {
    type: RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
  };
}

function fetchMyNotAssignedProducts() {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    dispatch(requestMyNotAssignedProducts());
    return productsApi.fetchMyNotAssignedItems(apiUrl, token)
      .then((response) => {
        dispatch(receiveMyNotAssignedProducts(response));
      }, (error) => {
        dispatch(receiveErrorMyNotAssignedProducts());
        throw error;
      });
  };
}

function shouldFetchMyNotAssignedProducts(notAssignedProducts) {
  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = notAssignedProducts;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT));
}

export function fetchMyNotAssignedProductsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMyNotAssignedProducts(getState().myNotAssignedProducts)) {
      return dispatch(fetchMyNotAssignedProducts());
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function updateMyNotAssignedProduct(itemId, name, description, images, imagesToRemove) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const item = {
      name,
      description,
      imagesToRemove,
    };

    return productsApi.editItem(apiUrl, token, itemId, item, images)
      .then((response) => {
        dispatch({
          type: UPDATE_MY_NOT_ASSIGNED_PRODUCT,
          item: response,
        });
      }, (error) => {
        throw error;
      });
  };
}


export default {
  fetchMyNotAssignedProductsIfNeeded,
  updateMyNotAssignedProduct,
};
