import {
  REQUEST_USER_DETAILS,
  RECEIVE_USER_DETAILS,
  RECEIVE_ERROR_USER_DETAILS,
  UPDATE_USER_DETAILS,
  INVALIDATE_USER_DETAILS,
} from '../reducers/user';

import userApi from '../api/user';

const VALIDATE_TIME = 1000 * 60 * 10;
const FETCHING_TIMEOUT = 1000 * 32;

const mock_user_data = {
  id: 1,
  name: 'Jan',
  surname: 'Kowalski',
  username: 'johnny_user',
  email: 'kowalsky@gmail.com',
  address: 'ul. Kawiory 99',
  city: 'Kraków',
  postalCode: '30-055',
  country: 'Polska',
  roles: [
    'ROLE_USER',
  ],
};

function requestUserDetails() {
  return {
    type: REQUEST_USER_DETAILS,
    timestamp: Date.now(),
  };
}

function invalidateUserDetails() {
  return {
    type: INVALIDATE_USER_DETAILS,
    timestamp: Date.now(),
  };
}

function receiveUserDetails(userDetails) {
  return {
    type: RECEIVE_USER_DETAILS,
    timestamp: Date.now(),
    data: userDetails,
  };
}

function receiveErrorUserDetails() {
  return {
    type: RECEIVE_ERROR_USER_DETAILS,
    timestamp: Date.now(),
  };
}


function fetchUserDetails() {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    dispatch(requestUserDetails());
    return userApi.fetchMyData(apiUrl, token)
      .then((response) => {
        dispatch(receiveUserDetails(response));
      }, (error) => {
        dispatch(receiveErrorUserDetails());
        throw error;
      });
  };
}


function shouldFetchUserDetails(user) {
  const {
    isFetchingSince,
    didInvalidate,
    lastSuccessfulFetch,
  } = user;

  if (
    !isFetchingSince && (didInvalidate
    || !lastSuccessfulFetch
    || (Date.now() - lastSuccessfulFetch > VALIDATE_TIME))
  ) {
    return true;
  }

  return !!(isFetchingSince && ((Date.now() - isFetchingSince) > FETCHING_TIMEOUT));
}

export function fetchUserDetailsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchUserDetails(getState().user)) {
      return dispatch(fetchUserDetails());
    }

    return Promise.resolve('There is no need of fetch');
  };
}

export function updateUserDetails(name, surname, email, address, city, postalCode, country) {
  return (dispatch, getState) => {
    const { apiUrl, token } = getState().auth;
    const details = {
      name,
      surname,
      email,
      address,
      city,
      postalCode,
      country,
    };
    return userApi.editUserDetails(apiUrl, token, details)
      .then((response) => {
        dispatch({
          type: UPDATE_USER_DETAILS,
          data: response,
        });
      }, (error) => {
        throw error;
      });
  };
}

export function fetchOtherUser(userId) {
  return (_, getState) => {
    const { apiUrl, token } = getState().auth;

    return userApi.fetchUser(apiUrl, token, userId)
      .then(response => response, (error) => {
        throw error;
      });
  };
}

export default {
  fetchUserDetailsIfNeeded,
  updateUserDetails,
  fetchOtherUser,
};
