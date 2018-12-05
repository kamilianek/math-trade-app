import { SIGN_OUT_FINISHED } from './auth';


const INITIAL_STATE = {
  productsByEdition: { },
};

export const RECEIVE_ERROR_OTHER_ASSIGNED_PRODUCTS = 'RECEIVE_ERROR_OTHER_ASSIGNED_PRODUCTS';
export const REQUEST_OTHER_ASSIGNED_PRODUCTS = 'REQUEST_OTHER_ASSIGNED_PRODUCTS';
export const INVALIDATE_OTHER_ASSIGNED_PRODUCTS = 'INVALIDATE_OTHER_ASSIGNED_PRODUCTS';
export const RECEIVE_OTHER_ASSIGNED_PRODUCTS = 'RECEIVE_OTHER_ASSIGNED_PRODUCTS';


export default function otherAssignedProductsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_OUT_FINISHED:
      return {
        ...INITIAL_STATE,
      };
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
