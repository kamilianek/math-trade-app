const INITIAL_STATE = {
  preferencesByEdition: {
    3: {
      isFetchingSince: null,
      lastSuccessfulFetch: null,
      lastFailedFetch: null,
      didInvalidate: false,
      preferences: [
        {
          id: 1,
          userId: 2,
          haveProductId: 3,
          wantedProductsIds: [4, 5, 6],
          wantedDefinedGroupsIds: [3],
        },
        {
          id: 2,
          userId: 2,
          haveProductId: 4,
          wantedProductsIds: [10, 11, 12],
          wantedDefinedGroupsIds: [4],
        },
      ],
    },
  },
};

export const RECEIVE_ERROR_PREFERENCES = 'RECEIVE_ERROR_PREFERENCES';
export const RECEIVE_PREFERENCES = 'RECEIVE_PREFERENCES';
export const REQUEST_PREFERENCES = 'REQUEST_PREFERENCES';
export const INVALIDATE_PREFERENCES = 'INVALIDATE_PREFERENCES';
export const UPDATE_PREFERENCE_FOR_PRODUCT = 'UPDATE_PREFERENCE_FOR_PRODUCT';


export default function preferencesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
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
    // TODO: will be changed after API integration - will receive action.preference
    case UPDATE_PREFERENCE_FOR_PRODUCT:
      return {
        ...state,
        preferencesByEdition: {
          ...state.preferencesByEdition,
          [action.editionId]: {
            ...state.preferencesByEdition[action.editionId],
            preferences: [
              ...state.preferencesByEdition[action.editionId].preferences
                .filter(pref => (pref.haveProductId !== action.preference.haveProductId)),
              action.preference,
            ],
          },
        },
      };
    default:
      return state;
  }
}
