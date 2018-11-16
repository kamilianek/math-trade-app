import {
  RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS,
  REQUEST_MY_NOT_ASSIGNED_PRODUCTS,
  INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS,
  RECEIVE_MY_NOT_ASSIGNED_PRODUCTS,
  UPDATE_MY_NOT_ASSIGNED_PRODUCT,
} from '../reducers/myNotAssignedProducts';

const myNotAssignedProducts = [
  {
    id: 100,
    name: 'Fetched not assigned 1',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum dictum ipsum eu elit iaculis, ut pellentesque velit sollicitudin. Donec gravida quis tellus vitae lacinia. Fusce ultricies eget erat commodo consequat.',
    userId: 1,
    images: [
      { uri: 'http://placekitten.com/g/800/600' },
      { uri: 'http://placekitten.com/g/600/600' },
      { uri: 'http://placekitten.com/g/400/200' },
      { uri: 'http://placekitten.com/g/350/200' },
    ],
  },
  {
    id: 101,
    name: 'Fetched not assigned 2',
    description: 'Mauris lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. Suspendisse accumsan venenatis maximus.',
    userId: 1,
    images: [
      { uri: 'http://placekitten.com/g/455/270' },
      { uri: 'http://placekitten.com/g/1200/600' },
    ],
  },
  {
    id: 102,
    name: 'Fetched not assigned 3',
    description: 'Curabitur fringilla dui eros.',
    userId: 1,
    images: [
      { uri: 'http://placekitten.com/g/600/250' },
    ],
  },
];


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
  return async (dispatch) => {
    dispatch(requestMyNotAssignedProducts());
    try {
      // const items = await api.myProducts.fetchMyNotAssignedProducts(editionId)
      dispatch(receiveMyNotAssignedProducts(myNotAssignedProducts));
    } catch (e) {
      dispatch(receiveErrorMyNotAssignedProducts());
    }
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

export function updateMyNotAssignedProduct(id, name, description, images) {
  return async (dispatch) => {
    // const item = await api.myProducts.updateNotAssignedProduct()
    dispatch({
      type: UPDATE_MY_NOT_ASSIGNED_PRODUCT,
      item: {
        id,
        userId: 1,
        name,
        description,
        images,
      },
    });
  };
}


export default {
  fetchMyNotAssignedProductsIfNeeded,
  updateMyNotAssignedProduct,
};
