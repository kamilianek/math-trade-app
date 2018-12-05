import { SIGN_OUT_FINISHED } from './auth';


const INITIAL_STATE = {
  preferencesByEdition: { },
};

export const RECEIVE_ERROR_PREFERENCES = 'RECEIVE_ERROR_PREFERENCES';
export const RECEIVE_PREFERENCES = 'RECEIVE_PREFERENCES';
export const REQUEST_PREFERENCES = 'REQUEST_PREFERENCES';
export const INVALIDATE_PREFERENCES = 'INVALIDATE_PREFERENCES';
export const UPDATE_PREFERENCE_FOR_PRODUCT = 'UPDATE_PREFERENCE_FOR_PRODUCT';


export default function preferencesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_OUT_FINISHED:
      return {
        ...INITIAL_STATE,
      };
    case INVALIDATE_PREFERENCES:
      return {
        ...state,
        preferencesByEdition: {
          ...state.preferencesByEdition,
          [action.editionId]: {
            ...state.preferencesByEdition[action.editionId],
            didInvalidate: true,
          },
        },
      };
    case REQUEST_PREFERENCES:
      return {
        ...state,
        preferencesByEdition: {
          ...state.preferencesByEdition,
          [action.editionId]: {
            ...state.preferencesByEdition[action.editionId],
            isFetchingSince: action.timestamp,
          },
        },
      };
    case RECEIVE_PREFERENCES:
      return {
        ...state,
        preferencesByEdition: {
          ...state.preferencesByEdition,
          [action.editionId]: {
            ...state.preferencesByEdition[action.editionId],
            isFetchingSince: null,
            didInvalidate: false,
            preferences: action.preferences,
            lastSuccessfulFetch: action.timestamp,
          },
        },
      };
    case RECEIVE_ERROR_PREFERENCES:
      return {
        ...state,
        preferencesByEdition: {
          ...state.preferencesByEdition,
          [action.editionId]: {
            ...state.preferencesByEdition[action.editionId],
            isFetchingSince: null,
            lastFailedFetch: action.timestamp,
          },
        },
      };
    case UPDATE_PREFERENCE_FOR_PRODUCT:
      return {
        ...state,
        preferencesByEdition: {
          ...state.preferencesByEdition,
          [action.editionId]: {
            ...state.preferencesByEdition[action.editionId],
            preferences: [
              ...state.preferencesByEdition[action.editionId].preferences
                .filter(pref => (pref.haveItemId !== action.preference.haveItemId)),
              action.preference,
            ],
          },
        },
      };
    default:
      return state;
  }
}
