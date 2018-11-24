/**
 * Created by kamilianek on 24.11.18.
 */
const INITIAL_STATE = {
  id: 1,
  name: 'admin',
  surname: 'admin',
  username: 'admin',
  email: 'admin@gmail.com',
  address: 'admin',
  city: 'admin',
  postalCode: 'admin',
  country: 'admin',
  roles: [
    'ROLE_USER',
  ],
};


export const REQUEST_USER_DETAILS = 'REQUEST_USER_DETAILS';
export const RECEIVE_USER_DETAILS = 'RECEIVE_USER_DETAILS';
export const RECEIVE_ERROR_USER_DETAILS = 'RECEIVE_ERROR_USER';
export const UPDATE_USER_DETAILS = 'UPDATE_USER_DETAILS';
