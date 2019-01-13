import {
  RECEIVE_ERROR_MY_ASSIGNED_PRODUCTS,
  REQUEST_MY_ASSIGNED_PRODUCTS,
  INVALIDATE_MY_ASSIGNED_PRODUCTS,
  RECEIVE_MY_ASSIGNED_PRODUCTS,
  CREATE_MY_ASSIGNED_PRODUCT,
  UPDATE_MY_ASSIGNED_PRODUCT,
} from '../reducers/myAssignedProducts';

import productsApi from '../api/products';

import {
  REMOVE_MY_NOT_ASSIGNED_PRODUCT,
} from '../reducers/myNotAssignedProducts';

const VALIDATE_TIME = 1000 * 60 * 10;
const FETCHING_TIMEOUT = 1000 * 32;


function requestMyAssignedProducts(editionId) {
  return {
    type: REQUEST_MY_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidateMyAssignedProducts(editionId) {
  return {
    type: INVALIDATE_MY_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
    editionId,
  };
}

function receiveMyAssignedProducts(editionId, items) {
  return {
    type: RECEIVE_MY_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
    editionId,
    items,
  };
}

function receiveErrorMyAssignedProducts(editionId) {
  return {
    type: RECEIVE_ERROR_MY_ASSIGNED_PRODUCTS,
    timestamp: Date.now(),
    editionId,
  };
}

function fetchMyAssignedProducts(editionId) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    dispatch(requestMyAssignedProducts(editionId));
    return productsApi.fetchMyItems(apiUrl, token, editionId)
      .then((response) => {
        dispatch(receiveMyAssignedProducts(editionId, response));
      }, (error) => {
        dispatch(receiveErrorMyAssignedProducts(editionId));
        throw error;
      });
  };
}


function shouldFetchMyAssignedProducts(products) {
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

export function fetchMyAssignedProductsIfNeeded(editionId) {
  return (dispatch, getState) => {
    if (shouldFetchMyAssignedProducts(getState().myAssignedProducts.productsByEdition[editionId])) {
      return dispatch(fetchMyAssignedProducts(editionId));
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function createProduct(editionId, name, description, images) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const item = {
      name,
      description,
      imagesToRemove: [],
    };

    return productsApi.createItem(apiUrl, token, editionId, item, images)
      .then((response) => {
        dispatch({
          type: CREATE_MY_ASSIGNED_PRODUCT,
          editionId: response.editionId,
          item: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

export function updateMyAssignedProduct(
  editionId,
  itemId,
  name,
  description,
  images,
  imagesToRemove,
) {
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
          type: UPDATE_MY_ASSIGNED_PRODUCT,
          editionId,
          item: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

function removeMyNotAssignedProduct(itemId) {
  return {
    type: REMOVE_MY_NOT_ASSIGNED_PRODUCT,
    itemId,
  };
}

export function assignProductToEdition(editionId, itemId) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;

    return productsApi.assignItemToEdition(apiUrl, token, editionId, itemId)
      .then((response) => {
        dispatch({
          type: CREATE_MY_ASSIGNED_PRODUCT,
          editionId,
          item: response,
        });
        dispatch(removeMyNotAssignedProduct(itemId));
      }, (error) => {
        throw error;
      });
  };
}

export default {
  fetchMyAssignedProductsIfNeeded,
  createProduct,
  updateMyAssignedProduct,
  assignProductToEdition,
};
