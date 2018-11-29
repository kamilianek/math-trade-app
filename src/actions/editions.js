import {
  RECEIVE_ERROR_EDITIONS,
  REQUEST_EDITIONS,
  INVALIDATE_EDITIONS,
  RECEIVE_EDITIONS,
  CREATE_EDITION,
  EDIT_EDITION,
  CLOSE_EDITION,
  JOIN_EDITION,
  REOPEN_EDITION,
  PUBLISH_EDITION,
  CANCEL_EDITION,
} from '../reducers/editions';

const VALIDATE_TIME = 1000 * 60 * 5;
const FETCHING_TIMEOUT = 1000 * 32;

const mock_editions = [
  {
    name: 'Mathandel 621',
    description: 'this edition is very cool',
    endDate: '2019-11-03',
    maxParticipants: 12,
    numberOfParticipants: 1,
    id: 2,
    moderator: true,
    participant: false,
    status: 'PUBLISHED',
  },
  {
    name: 'Mathandel 2',
    description: 'this edition is very cool',
    endDate: '2019-11-22',
    maxParticipants: 1,
    numberOfParticipants: 1,
    id: 3,
    moderator: true,
    participant: true,
    status: 'OPENED',
  },
  {
    name: 'Mathandel 222',
    description: 'this edition is very cool',
    endDate: '2019-11-22',
    maxParticipants: 100,
    numberOfParticipants: 67,
    id: 4,
    moderator: false,
    participant: false,
    status: 'OPENED',
  },
  {
    name: 'Mathandel 222',
    description: 'this edition is very cool',
    endDate: '2019-11-22',
    maxParticipants: 100,
    numberOfParticipants: 47,
    id: 5,
    moderator: false,
    participant: true,
    status: 'PUBLISHED',
  },
  {
    name: 'Mathandel xx1',
    description: 'this edition is not very cool',
    endDate: '2019-12-22',
    maxParticipants: 1100,
    numberOfParticipants: 647,
    id: 6,
    moderator: false,
    participant: false,
    status: 'PUBLISHED',
  },
];


function requestEditions(editionId) {
  return {
    type: REQUEST_EDITIONS,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidateEditions() {
  return {
    type: INVALIDATE_EDITIONS,
    timestamp: Date.now(),
  };
}

function receiveEditions(editions) {
  return {
    type: RECEIVE_EDITIONS,
    timestamp: Date.now(),
    editions,
  };
}

function receiveErrorEditions() {
  return {
    type: RECEIVE_ERROR_EDITIONS,
    timestamp: Date.now(),
  };
}


function fetchEditions() {
  return async (dispatch) => {
    dispatch(requestEditions());
    try {
      // const editions = await api.editions.fetchEditions()
      dispatch(receiveEditions(mock_editions));
    } catch (e) {
      dispatch(receiveErrorEditions());
      throw e;
    }
  };
}


function shouldFetchEditions(editions) {
  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = editions;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT));
}

export function fetchEditionsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEditions(getState().editions)) {
      return dispatch(fetchEditions());
    }

    return Promise.resolve('There is no need of fetch');
  };
}

// TODO: use response as created edition
export function createEdition(name, description, endDate, maxParticipants) {
  return async (dispatch) => {
    // const item = await api.definedGroups.createEdition()
    dispatch({
      type: CREATE_EDITION,
      edition: {
        name,
        description,
        endDate,
        maxParticipants,
        numberOfParticipants: 1,
        id: Math.floor(Math.random() * 10000000),
        moderator: true,
        participant: true,
        status: 'OPENED',
      },
    });
  };
}

export function editEdition(id, name, description, endDate, maxParticipants) {
  return async (dispatch) => {
    // const item = await api.definedGroups.createEdition()
    // TODO: use response as edited edition
    console.log(id, name, description, endDate, maxParticipants);
    dispatch({
      type: EDIT_EDITION,
      edition: {
        name,
        description,
        endDate,
        maxParticipants,
        id,
        numberOfParticipants: 1,
        moderator: true,
        participant: true,
        status: 'OPENED',
      },
    });
  };
}

// TODO: pass returned object
export function closeEdition(id) {
  return async (dispatch) => {
    // const item = await api.editions.closeEdition()
    dispatch({
      type: CLOSE_EDITION,
      id,
    });
  };
}

// TODO: pass returned object
export function reopenEdition(id) {
  return async (dispatch) => {
    console.log('reopenEdition action', id);
    // const item = await api.editions.reopenEdition()
    dispatch({
      type: REOPEN_EDITION,
      id,
    });
  };
}

// TODO: pass returned object
export function publishEdition(id) {
  return async (dispatch) => {
    // const item = await api.editions.publishEdition()
    console.log('publishEdition action', id);
    dispatch({
      type: PUBLISH_EDITION,
      id,
    });
  };
}

// TODO: pass returned object
export function cancelEdition(id) {
  return async (dispatch) => {
    // const item = await api.editions.cancelEdition()
    console.log('cancelEdition action', id);
    dispatch({
      type: CANCEL_EDITION,
      id,
    });
  };
}


export function joinEdition(id) {
  return async (dispatch) => {
    // const item = await api.editions.joinEdition()
    dispatch({
      type: JOIN_EDITION,
      id,
    });
  };
}

export default {
  fetchEditionsIfNeeded,
  createEdition,
  editEdition,
  closeEdition,
  joinEdition,
  reopenEdition,
  publishEdition,
  cancelEdition,
};
