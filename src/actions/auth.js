import {
  LOGIN_FINISHED,
  SIGN_OUT_FINISHED,
  REGISTER_WITH_PASSWORD,
} from '../reducers/auth';

import authApi from '../api/auth';

export function signOut() {
  return {
    type: SIGN_OUT_FINISHED,
  };
}

export function loginWithPassword(username, password) {
  return (dispatch, getState) => {
    const { apiUrl } = getState().auth;
    return authApi.standardLogin(apiUrl, {
      usernameOrEmail: username,
      password,
    })
      .then((response) => {
        dispatch({
          type: LOGIN_FINISHED,
          token: response.accessToken,
          roles: response.roles,
          loginData: {
            username,
          },
          userExists: true,
        });
      }, (error) => {
        throw error;
      });
  };
}

export function changePassword(newPassword) {
  return async () => `changedTo:${newPassword}`;
}

export function registerWithPassword(data) {
  return (dispatch, getState) => {
    const { apiUrl } = getState().auth;
    console.log('state: ', apiUrl);
    return authApi.standardRegistration(apiUrl, data)
      .then((response) => {
        dispatch({
          type: REGISTER_WITH_PASSWORD,
          token: response.accessToken,
          roles: response.roles,
          loginData: {
            username: data.username,
          },
          userExists: true,
        });
      }, (error) => {
        console.log(error.message);
        throw error;
      });
  };
}

export function registerWithFacebook(data) {
  return (dispatch, getState) => {
    const { apiUrl } = getState().auth;
    return authApi.facebookRegistration(apiUrl, data)
      .then((response) => {
        console.log('data: ', response);
        dispatch({
          type: REGISTER_WITH_PASSWORD,
          token: response.accessToken,
          roles: response.roles,
          loginData: {
            username: data.username,
          },
          userExists: response.userExists,
        });
      }, (error) => {
        throw error;
      });
  };
}

export function loginWithFacebook(token) {
  return (dispatch, getState) => {
    const { apiUrl } = getState().auth;
    return authApi.facebookLogin(apiUrl, { token })
      .then((response) => {
        dispatch({
          type: LOGIN_FINISHED,
          token: response.accessToken,
          fbToken: token,
          roles: response.roles,
          loginData: {},
          userExists: response.userExists,
        });
        return response.userExists;
      }, (error) => {
        throw error;
      });
  };
}


export default {
  signOut,
  loginWithPassword,
  changePassword,
  registerWithPassword,
  loginWithFacebook,
  registerWithFacebook,
};
