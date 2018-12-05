import { SIGN_OUT_FINISHED } from './auth';

const INITIAL_STATE = {
  isFetchingSince: null,
  lastSuccessfulFetch: null,
  lastFailedFetch: null,
  didInvalidate: false,
  items: [],
};


export const RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS = 'RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS';
export const REQUEST_MY_NOT_ASSIGNED_PRODUCTS = 'REQUEST_MY_NOT_ASSIGNED_PRODUCTS';
export const INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS = 'INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS';
export const RECEIVE_MY_NOT_ASSIGNED_PRODUCTS = 'RECEIVE_MY_NOT_ASSIGNED_PRODUCTS';
export const UPDATE_MY_NOT_ASSIGNED_PRODUCT = 'UPDATE_MY_NOT_ASSIGNED_PRODUCT';
export const REMOVE_MY_NOT_ASSIGNED_PRODUCT = 'REMOVE_MY_NOT_ASSIGNED_PRODUCT';


export default function myNotAssignedProductsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_OUT_FINISHED:
      return {
        ...INITIAL_STATE,
      };
    case INVALIDATE_MY_NOT_ASSIGNED_PRODUCTS:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_MY_NOT_ASSIGNED_PRODUCTS:
      return {
        ...state,
        isFetchingSince: action.timestamp,
      };
    case RECEIVE_MY_NOT_ASSIGNED_PRODUCTS:
      return {
        ...state,
        isFetchingSince: null,
        didInvalidate: false,
        items: action.items,
        lastSuccessfulFetch: action.timestamp,
      };
    case RECEIVE_ERROR_MY_NOT_ASSIGNED_PRODUCTS:
      return {
        ...state,
        isFetchingSince: null,
        lastFailedFetch: action.timestamp,
      };
    case UPDATE_MY_NOT_ASSIGNED_PRODUCT:
      return {
        ...state,
        items: state.items.map(item => ((item.id === action.item.id) ? action.item : item)),
      };
    case REMOVE_MY_NOT_ASSIGNED_PRODUCT:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId),
      };
    default:
      return state;
  }
}
