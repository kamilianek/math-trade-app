import {
  LOGIN_FINISHED,
  SIGN_OUT_FINISHED,
  REQUEST_PERMISSION_REQUEST_STATUS,
  RECEIVE_PERMISSION_REQUEST_STATUS,
} from '../reducers/auth';


export function signOut() {
  return {
    type: SIGN_OUT_FINISHED,
  };
}

export function loginWithPassword(username, password) {
  return async (dispatch) => {
    // TODO: api login call
    // const response = await api.auth.loginEmail(email, password);
    dispatch({
      type: LOGIN_FINISHED,
      token: '1i236jghj12j31y32i1231ku2t',
      tokenData: {
        role: ['admin', 'user', 'moderator'],
      },
      loginData: {
        username,
      },
    });
    // TODO: fetching all needed
    // return dispatch(settings.fetchSettings());
  };
}

export default {
  signOut,
  loginWithPassword,
};
