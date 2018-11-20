import {
  RECEIVE_ERROR_OTHER_ASSIGNED_PRODUCTS,
  REQUEST_OTHER_ASSIGNED_PRODUCTS,
  INVALIDATE_OTHER_ASSIGNED_PRODUCTS,
  RECEIVE_OTHER_ASSIGNED_PRODUCTS,
} from '../reducers/otherAssignedProducts';

const VALIDATE_TIME = 1000 * 60 * 3;
const FETCHING_TIMEOUT = 1000 * 32;

const otherAssigned = [
  {
    id: 1000,
    editionId: 3,
    name: 'habitant',
    description: 'lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. ',
    userId: 1,
    images: [
      { uri: 'http://placekitten.com/g/250/355' },
    ],
  },
  {
    id: 1001,
    name: 'senectus',
    editionId: 3,
    description: 'lobortis ultrices dui. ',
    userId: 1,
    images: [
      { uri: 'http://placekitten.com/g/800/550' },
    ],
  },
  {
    id: 1002,
    editionId: 3,
    name: 'Catan',
    description: 'Game is almost new - used maybe 2 times.',
    userId: 1,
    images: [
      { uri: 'http://placekitten.com/g/200/300' },
      { uri: 'http://placekitten.com/g/800/600' },
      { uri: 'http://placekitten.com/g/300/300' },
      { uri: 'http://placekitten.com/g/150/150' },
      { uri: 'http://placekitten.com/g/600/450' },
    ],
  },
  {
    id: 1003,
    editionId: 3,
    name: 'Carcassone',
    description: 'Game is new - used maybe 5 times',
    userId: 1,
    images: [
      { uri: 'http://placekitten.com/g/400/300' },
    ],
  },
  {
    id: 1004,
    name: 'Carcassone',
    editionId: 3,
    description: 'Don\'t have box',
    userId: 1,
    images: [
      { uri: 'http://placekitten.com/g/1200/800' },
    ],
  },
];

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
  return async (dispatch) => {
    dispatch(requestOtherAssignedProducts(editionId));
    try {
      // const items = await api.myProducts.fetchOtherAssignedProducts(editionId)
      dispatch(receiveOtherAssignedProducts(editionId, otherAssigned));
    } catch (e) {
      dispatch(receiveErrorOtherAssignedProducts(editionId));
    }
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
