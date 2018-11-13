const INITIAL_STATE = {
  productsByEdition: {
    3: {
      isFetchingSince: null,
      lastSuccessfulFetch: null,
      lastFailedFetch: null,
      didInvalidate: false,
      items: [
        {
          id: 3,
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
          id: 4,
          editionId: 3,
          name: 'Carcassone',
          description: 'Game is new - used maybe 5 times',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 5,
          name: 'Carcassone',
          editionId: 3,
          description: 'Don\'t have box',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 6,
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
          id: 7,
          editionId: 3,
          name: 'Netus',
          description: 'senectus et netus',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 8,
          name: 'morbi',
          editionId: 3,
          description: 'Don\'t have box',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 9,
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
          id: 10,
          editionId: 3,
          name: 'habitant',
          description: 'lobortis ultrices dui, varius condimentum erat efficitur ut. Donec eget augue leo. ',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 11,
          name: 'senectus',
          editionId: 3,
          description: 'lobortis ultrices dui. ',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 12,
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
          id: 13,
          editionId: 3,
          name: 'Carcassone',
          description: 'Game is new - used maybe 5 times',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 14,
          name: 'Carcassone',
          editionId: 3,
          description: 'Don\'t have box',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 15,
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
          id: 16,
          editionId: 3,
          name: 'Netus',
          description: 'senectus et netus',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 17,
          name: 'morbi',
          editionId: 3,
          description: 'Don\'t have box',
          userId: 1,
          images: [
            { uri: 'http://placekitten.com/g/200/300' },
          ],
        },
        {
          id: 18,
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
