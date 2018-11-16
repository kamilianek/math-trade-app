const INITIAL_STATE = {
  productsByEdition: {
    3: {
      isFetchingSince: null,
      lastSuccessfulFetch: null,
      lastFailedFetch: null,
      didInvalidate: false,
      items: [
        {
          id: 1000,
          editionId: 3,
          name: 'habitant',
          description: 'lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. ',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 1001,
          name: 'senectus',
          editionId: 3,
          description: 'lobortis ultrices dui. ',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
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
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 1003,
          editionId: 3,
          name: 'Carcassone',
          description: 'Game is new - used maybe 5 times',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 1004,
          name: 'Carcassone',
          editionId: 3,
          description: 'Don\'t have box',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 1005,
          editionId: 3,
          name: 'Catan',
          description: 'Game is almost new - used maybe 2 times.',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 1006,
          editionId: 3,
          name: 'Netus',
          description: 'senectus et netus',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 1007,
          name: 'morbi',
          editionId: 3,
          description: 'Don\'t have box',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 1008,
          editionId: 3,
          name: 'tristique',
          description: 'lobortis ultrices dui. Donec eget augue leo. ',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 19,
          editionId: 3,
          name: 'habitant',
          description: 'lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. ',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 20,
          name: 'senectus',
          editionId: 3,
          description: 'lobortis ultrices dui. ',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
      ],
    },
  },
};

export const RECEIVE_ERROR_OTHER_ASSIGNED_PRODUCTS = 'RECEIVE_ERROR_OTHER_ASSIGNED_PRODUCTS';
export const REQUEST_OTHER_ASSIGNED_PRODUCTS = 'REQUEST_OTHER_ASSIGNED_PRODUCTS';
export const INVALIDATE_OTHER_ASSIGNED_PRODUCTS = 'INVALIDATE_OTHER_ASSIGNED_PRODUCTS';
export const RECEIVE_OTHER_ASSIGNED_PRODUCTS = 'RECEIVE_OTHER_ASSIGNED_PRODUCTS';


export default function otherAssignedProductsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVALIDATE_OTHER_ASSIGNED_PRODUCTS:
      return {
        ...state,
        productsByEdition: {
          ...state.productsByEdition,
          [action.editionId]: {
            ...state.productsByEdition[action.editionId],
            didInvalidate: true,
          },
        },
      };
    case REQUEST_OTHER_ASSIGNED_PRODUCTS:
      return {
        ...state,
        productsByEdition: {
          ...state.productsByEdition,
          [action.editionId]: {
            ...state.productsByEdition[action.editionId],
            isFetchingSince: action.timestamp,
          },
        },
      };
    case RECEIVE_OTHER_ASSIGNED_PRODUCTS:
      return {
        ...state,
        productsByEdition: {
          ...state.productsByEdition,
          [action.editionId]: {
            ...state.productsByEdition[action.editionId],
            isFetchingSince: null,
            didInvalidate: false,
            items: action.items,
            lastSuccessfulFetch: action.timestamp,
          },
        },
      };
    case RECEIVE_ERROR_OTHER_ASSIGNED_PRODUCTS:
      return {
        ...state,
        productsByEdition: {
          ...state.productsByEdition,
          [action.editionId]: {
            ...state.productsByEdition[action.editionId],
            isFetchingSince: null,
            lastFailedFetch: action.timestamp,
          },
        },
      };
    default:
      return state;
  }
}
