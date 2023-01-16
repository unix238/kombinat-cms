import axios from 'axios';

import config from '../config/config';

// Constants
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

// Async action
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${config.url}/auth/login`, {
        userLogin: username,
        password,
      });
      dispatch(loginSuccess(response.data));
      return true;
    } catch (error) {
      let message = 'An error occurred';
      if (error.response) {
        console.log('im here');
        console.log(error.response);
        message = error.response.data.message;
      }
      dispatch(loginFailure(message));
      return false;
    }
  };
};
