import Cookies from 'js-cookie';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
    default:
      return state;
  }
}

export default reducer;
