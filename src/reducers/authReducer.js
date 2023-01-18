import Cookies from 'js-cookie';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER,
} from '../actions/authActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      // localStorage.setItem('user', JSON.stringify(action.user));
      Cookies.set('token', action.user.token);

      return {
        ...state,
        user: action.user,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

export default reducer;
