import {
  LOGIN_FINISHED,
  SIGN_OUT_FINISHED,
  REGISTER_WITH_PASSWORD,
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
      roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_MODERATOR'],
      loginData: {
        username,
      },
    });
    // TODO: fetching all needed
    // return dispatch(settings.fetchSettings());
  };
}

export function changePassword(newPassword) {
  return async () => {
    // TODO: api call
    // const response = await api.auth.(emhloginEmailangePassword(newPassword);
    const response = `chngedTo:${newPassword}`;
    return response;
  };
}

export function registerWithPassword(data) {
  return async (dispatch) => {
    // TODO: api login call
    console.log('data', data);
    // const response = await api.auth.registerWithPassword(data);
    dispatch({
      type: REGISTER_WITH_PASSWORD,
      token: '1i236jghj12j31y32i1231ku2t',
      roles: ['ROLE_USER'],
      loginData: {
        username: data.username,
      },
    });
  };
}


export default {
  signOut,
  loginWithPassword,
  changePassword,
  registerWithPassword,
};
