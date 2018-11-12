import fetch from 'isomorphic-fetch';
import store from '../store';

import {
  RequestError,
  ServerError,
  ForbiddenError,
  UnauthorizedError,
  UnexpectedResponseError,
  NotFoundError,
} from './errors';

const Errors = [
  [1, 'Wrong email or password'],
  [2, 'Email already in use'],
  [19, 'Confirm your account first'],
  [23, 'Wrong input'],
  [26, 'You must complete your profile before using website'],
  [38, 'You don\'t have enough money, please  fund your account'],
];

const ErrorsMap = new Map(Errors);

export default async function fetchJsonApi(method, endpoint, expectedStatus, body, headers) {
  const state = store.store.getState();
  const { apiUrl } = state.auth;
  const requestHeader = {
    Accept: 'application/json',
    'Accept-Language': 'en-US',
    'Content-Type': 'application/json',
    ...headers,
  };

  // this is necessary for uploads, null value cause browser to generate this header
  if (requestHeader['Content-Type'] === null) {
    delete requestHeader['Content-Type'];
  }
  return fetch(`${apiUrl}/${endpoint}`, {
    method,
    headers: requestHeader,
    body: body && (body instanceof FormData ? body : JSON.stringify(body)),
  })
    .catch((requestError) => {
      throw new RequestError(requestError);
    })
    .then((response) => {
      if (response.status >= 500) {
        throw new ServerError(
          `Server returned ${response.status} status code`,
          response.status,
          response,
        );
      }
      if (response.status === 404) {
        throw new NotFoundError();
      }
      if (response.status === 403) {
        throw new ForbiddenError();
      }
      if (response.status === 401) {
        throw new UnauthorizedError();
      }
      if (response.status === 400) {
        return response.json()
          .then((error) => {
            if (ErrorsMap.get(error['error-code'])) {
              throw new RequestError(error['error-code'], ErrorsMap.get(error['error-code']));
            } else {
              throw new UnexpectedResponseError(
                `Server returned unexpected status code: ${response.status}`,
                response.status,
                response,
              );
            }
          });
      }
      if (response.status !== expectedStatus) {
        throw new UnexpectedResponseError(
          `Server returned unexpected status code: ${response.status}`,
          response.status,
          response,
        );
      }
      return response.status === 200 ? response.json() : response;
    });
}