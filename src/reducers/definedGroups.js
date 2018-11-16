const INITIAL_STATE = {
  definedGroupsByEdition: {
    3: {
      isFetchingSince: null,
      lastSuccessfulFetch: null,
      lastFailedFetch: null,
      didInvalidate: false,
      groups: [
        {
          id: 10000,
          name: 'Group345',
          productsIds: [3, 4, 5],
          groupIds: [],
        },
        {
          id: 10001,
          name: 'Group567',
          productsIds: [5, 6, 7],
          groupIds: [3],
        },
      ],
    },
  },
};


export const RECEIVE_ERROR_DEFINED_GROUPS = 'RECEIVE_ERROR_DEFINED_GROUPS';
export const REQUEST_DEFINED_GROUPS = 'REQUEST_DEFINED_GROUPS';
export const INVALIDATE_DEFINED_GROUPS = 'INVALIDATE_DEFINED_GROUPS';
export const RECEIVE_DEFINED_GROUPS = 'RECEIVE_DEFINED_GROUPS';

export default function definedGroupsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case INVALIDATE_DEFINED_GROUPS:
      return {
        ...state,
        definedGroupsByEdition: {
          ...state.definedGroupsByEdition,
          [action.editionId]: {
            ...state.definedGroupsByEdition[action.editionId],
            didInvalidate: true,
          },
        },
      };
    case REQUEST_DEFINED_GROUPS:
      return {
        ...state,
        definedGroupsByEdition: {
          ...state.definedGroupsByEdition,
          [action.editionId]: {
            ...state.definedGroupsByEdition[action.editionId],
            isFetchingSince: action.timestamp,
          },
        },
      };
    case RECEIVE_DEFINED_GROUPS:
      return {
        ...state,
        definedGroupsByEdition: {
          ...state.definedGroupsByEdition,
          [action.editionId]: {
            ...state.definedGroupsByEdition[action.editionId],
            isFetchingSince: null,
            didInvalidate: false,
            groups: action.groups,
            lastSuccessfulFetch: action.timestamp,
          },
        },
      };
    case RECEIVE_ERROR_DEFINED_GROUPS:
      return {
        ...state,
        definedGroupsByEdition: {
          ...state.definedGroupsByEdition,
          [action.editionId]: {
            ...state.definedGroupsByEdition[action.editionId],
            isFetchingSince: null,
            lastFailedFetch: action.timestamp,
          },
        },
      };
    default:
      return state;
  }
}
