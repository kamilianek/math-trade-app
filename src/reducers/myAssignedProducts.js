
const INITIAL_STATE = {
  productsByEdition: {
  },
};

export const RECEIVE_ERROR_MY_ASSIGNED_PRODUCTS = 'RECEIVE_ERROR_MY_ASSIGNED_PRODUCTS';
export const REQUEST_MY_ASSIGNED_PRODUCTS = 'REQUEST_MY_ASSIGNED_PRODUCTS';
export const INVALIDATE_MY_ASSIGNED_PRODUCTS = 'INVALIDATE_MY_ASSIGNED_PRODUCTS';
export const RECEIVE_MY_ASSIGNED_PRODUCTS = 'RECEIVE_MY_ASSIGNED_PRODUCTS';
export const CREATE_MY_ASSIGNED_PRODUCT = 'CREATE_MY_ASSIGNED_PRODUCT';
export const ASSIGN_PRODUCT_TO_EDITION = 'ASSIGN_PRODUCT_TO_EDITION';
export const UPDATE_MY_ASSIGNED_PRODUCT = 'UPDATE_MY_ASSIGNED_PRODUCT';


export default function myAssignedProductsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVALIDATE_MY_ASSIGNED_PRODUCTS:
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
    case REQUEST_MY_ASSIGNED_PRODUCTS:
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
    case RECEIVE_MY_ASSIGNED_PRODUCTS:
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
    case RECEIVE_ERROR_MY_ASSIGNED_PRODUCTS:
      return {
        ...state,
        productsByEdition: {
          ...state.productsByEdition,
          [action.editionId]: {
            ...state.productsByEdition[action.editionId],
            isFetchingSince: null,
            lastSuccessfulFetch: action.timestamp,
          },
        },
      };
    case CREATE_MY_ASSIGNED_PRODUCT:
      return {
        ...state,
        productsByEdition: {
          ...state.productsByEdition,
          [action.editionId]: {
            ...state.productsByEdition[action.editionId],
            items: [...state.productsByEdition[action.editionId].items, action.item],
          },
        },
      };
    case UPDATE_MY_ASSIGNED_PRODUCT:
      return {
        ...state,
        productsByEdition: {
          ...state.productsByEdition,
          [action.editionId]: {
            ...state.productsByEdition[action.editionId],
            items: state.productsByEdition[action.editionId].items
              .map(item => ((item.id === action.item.id) ? action.item : item)),
          },
        },
      };
    default:
      return state;
  }
}
