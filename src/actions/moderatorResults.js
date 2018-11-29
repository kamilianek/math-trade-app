import {
  REQUEST_MODERATOR_RESULTS,
  RECEIVE_MODERATOR_RESULTS,
  RECEIVE_ERROR_MODERATOR_RESULTS,
  INVALIDATE_MODERATOR_RESULTS,
} from '../reducers/moderatorResults';


const VALIDATE_TIME_MODERATOR_RESULTS = 1000 * 60 * 10;
const FETCHING_TIMEOUT_MODERATOR_RESULTS = 1000 * 32;


const mock_results = {
  status: 'CLOSED',
  results: [
    {
      id: 2,
      senderId: 2,
      receiverId: 3,
      item: {
        id: 3,
        name: 'item3',
        description: 'item3 description',
        userId: 3,
        editionId: 1,
        images: [
          { uri: 'http://placekitten.com/g/400/500' },
          { uri: 'http://placekitten.com/g/650/600' },
        ],
      },
      rate: null,
    },
    {
      id: 3,
      senderId: 3,
      receiverId: 1,
      item: {
        id: 1,
        name: 'item1',
        description: 'item1 description',
        userId: 1,
        editionId: 1,
        images: [
          { uri: 'http://placekitten.com/g/420/400' },
          { uri: 'http://placekitten.com/g/250/620' },
        ],
      },
      rate: {
        resultId: 3,
        rate: 2,
        comment: 'Produkt niezgodny z opisem!',
      },
    },
    {
      id: 1,
      senderId: 1,
      receiverId: 2,
      item: {
        id: 2,
        name: 'item2',
        description: 'item2 description',
        userId: 2,
        editionId: 1,
        images: [
          { uri: 'http://placekitten.com/g/300/300' },
          { uri: 'http://placekitten.com/g/250/600' },
        ],
      },
      rate: null,
    },
  ],
};


function requestModeratorResults(editionId) {
  return {
    type: REQUEST_MODERATOR_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function invalidateModeratorResults(editionId) {
  return {
    type: INVALIDATE_MODERATOR_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function receiveModeratorResults(editionId, result) {
  return {
    type: RECEIVE_MODERATOR_RESULTS,
    timestamp: Date.now(),
    editionId,
    result,
  };
}

function receiveErrorModeratorResults(editionId) {
  return {
    type: RECEIVE_ERROR_MODERATOR_RESULTS,
    timestamp: Date.now(),
    editionId,
  };
}

function fetchModeratorResults(editionId) {
  return async (dispatch) => {
    dispatch(requestModeratorResults(editionId));
    try {
      // const items = await api.results.fetchResults(editionId)
      dispatch(receiveModeratorResults(editionId, mock_results));
    } catch (e) {
      dispatch(receiveErrorModeratorResults(editionId));
    }
  };
}

function shouldFetchModeratorResults(results) {
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
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME_MODERATOR_RESULTS))
  ) {
    return true;
  }

  return !!(isFetchingSince && (
    (Date.now() - isFetchingSince) > FETCHING_TIMEOUT_MODERATOR_RESULTS)
  );
}

export function fetchModeratorResultsIfNeeded(editionId, forced) {
  return (dispatch, getState) => {
    if (forced
      || shouldFetchModeratorResults(getState().moderatorResults.resultsByEdition[editionId])) {
      return dispatch(fetchModeratorResults(editionId));
    }

    return Promise.resolve('There is no need of fetch');
  };
}


export default {
  fetchModeratorResultsIfNeeded,
};
