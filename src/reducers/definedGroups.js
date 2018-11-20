const INITIAL_STATE = {
  definedGroupsByEdition: { },
};


export const RECEIVE_ERROR_DEFINED_GROUPS = 'RECEIVE_ERROR_DEFINED_GROUPS';
export const REQUEST_DEFINED_GROUPS = 'REQUEST_DEFINED_GROUPS';
export const INVALIDATE_DEFINED_GROUPS = 'INVALIDATE_DEFINED_GROUPS';
export const RECEIVE_DEFINED_GROUPS = 'RECEIVE_DEFINED_GROUPS';
export const CREATE_DEFINED_GROUP = 'CREATE_DEFINED_GROUP';
export const EDIT_DEFINED_GROUP = 'EDIT_DEFINED_GROUP';
export const UPDATE_DEFINED_GROUP_CONTENT = 'UPDATE_DEFINED_GROUP_CONTENT';

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
    case CREATE_DEFINED_GROUP:
      return {
        ...state,
        definedGroupsByEdition: {
          ...state.definedGroupsByEdition,
          [action.editionId]: {
            ...state.definedGroupsByEdition[action.editionId],
            groups: [...state.definedGroupsByEdition[action.editionId].groups, action.group],
          },
        },
      };
    case EDIT_DEFINED_GROUP:
    case UPDATE_DEFINED_GROUP_CONTENT:
      return {
        definedGroupsByEdition: {
          ...state.definedGroupsByEdition,
          [action.editionId]: {
            ...state.definedGroupsByEdition[action.editionId],
            groups: state.definedGroupsByEdition[action.editionId].groups
              .map(group => (group.id === action.group.id ? action.group : group)),
          },
        },
      };
    default:
      return state;
  }
}
