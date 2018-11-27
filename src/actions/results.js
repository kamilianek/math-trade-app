// import {
//   REQUEST_MODERATOR_RESULTS,
//   RECEIVE_MODERATOR_RESULTS,
//   RECEIVE_ERROR_MODERATOR_RESULTS,
//   INVALIDATE_MODERATOR_RESULTS,
// } from '../reducers/moderatorResults';

import {
  REQUEST_USER_RESULTS,
  RECEIVE_USER_RESULTS,
  RECEIVE_ERROR_USER_RESULTS,
  INVALIDATE_USER_RESULTS,
  RATE_RESULT,
} from '../reducers/results';

const VALIDATE_TIME_USER_RESULTS = 1000 * 60 * 10;
const FETCHING_TIMEOUT_USER_RESULTS = 1000 * 32;

// const VALIDATE_TIME_MODERATOR_RESULTS = 1000 * 60 * 10;
// const FETCHING_TIMEOUT_MODERATOR_RESULTS = 1000 * 32;

const mock_results = {
  resultsToSend: [
    {
      id: 2,
      senderId: null,
      receiverId: 2,
      item: {
        id: 3,
        name: 'Carcassone',
        description: 'item3 description',
        userId: 3,
        editionId: 1,
        images: [
          { uri: 'http://placekitten.com/g/400/400' },
          { uri: 'http://placekitten.com/g/250/600' },
        ],
      },
      rate: {
        resultId: 2,
        rate: 4,
        comment: 'Wspaniały użytkownik.\nOpis zgodny z produktem.\nWszystko dotarło na czas. Gorąco polecam!',
      },
    },
    {
      id: 4,
      senderId: null,
      receiverId: 2,
      item: {
        id: 3,
        name: 'Catan',
        description: 'item10 description',
        userId: 3,
        editionId: 1,
        images: [
          { uri: 'http://placekitten.com/g/400/400' },
          { uri: 'http://placekitten.com/g/250/600' },
        ],
      },
      rate: null,
    },
  ],
  resultsToReceive: [
    {
      id: 3,
      senderId: 1,
      receiverId: null,
      item: {
        id: 1,
        name: 'item1',
        description: 'item1 description',
        userId: 1,
        editionId: 1,
        images: [
          { uri: 'http://placekitten.com/g/220/300' },
          { uri: 'http://placekitten.com/g/120/300' },
        ],
      },
      rate: null,
    },
    {
      id: 5,
      senderId: 1,
      receiverId: null,
      item: {
        id: 4,
        name: 'Magia i miecz',
        description: 'Przykładowy opis gry',
        userId: 1,
        editionId: 1,
        images: [
          { uri: 'http://placekitten.com/g/220/300' },
          { uri: 'http://placekitten.com/g/120/300' },
        ],
      },
      rate: {
        resultId: 3,
        rate: 2,
        comment: 'Produkt niezgodny z opisem!',
      },
    },
  ],
  senders: [
    {
      id: 1,
      name: 'admin',
      surname: 'admin',
      username: 'admin',
      email: 'admin@admin.admin',
    },
  ],
  receivers: [
    {
      id: 2,
      name: 'Jan',
      surname: 'Kowalski',
      username: 'jkowsky',
      email: 'kowalsky@gmail.com',
      address: 'ul. Kawiory 99',
      city: 'Kraków',
      country: 'Polska',
      postalCode: '33-555',
    },
  ],
};


function requestResults(editionId) {
  return {
    type: REQUEST_USER_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidateResults(editionId) {
  return {
    type: INVALIDATE_USER_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function receiveResults(editionId, result) {
  return {
    type: RECEIVE_USER_RESULTS,
    timestamp: Date.now(),
    editionId,
    result,
  };
}

function receiveErrorResults(editionId) {
  return {
    type: RECEIVE_ERROR_USER_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function fetchResults(editionId) {
  return async (dispatch) => {
    dispatch(requestResults(editionId));
    try {
      // const items = await api.results.fetchResults(editionId)
      dispatch(receiveResults(editionId, mock_results));
    } catch (e) {
      dispatch(receiveErrorResults(editionId));
    }
  };
}

function shouldFetchResults(results) {
  if (!results) {
    return true;
  }

  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = results;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME_USER_RESULTS))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT_USER_RESULTS));
}

export function fetchUserResultsIfNeeded(editionId) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState().results.resultsByEdition[editionId])) {
      return dispatch(fetchResults(editionId));
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function rateResult(editionId, resultId, rate, comment) {
  return async (dispatch) => {
    // const items = await api.myProducts.rateResult(resultId, rate, comment)
    // TODO: replace getState with returned value!!
    dispatch({
      type: RATE_RESULT,
      rate: {
        resultId,
        rate,
        comment,
      },
    });
  };
}

export default {
  fetchUserResultsIfNeeded,
  rateResult,
};
