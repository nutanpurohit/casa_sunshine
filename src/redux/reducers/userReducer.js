import {SET_LOGIN, SET_LOGOUT, USER_DATA} from '../actions/types';

const initialState = {
  token: null,
  user: null,
  isLogin: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN:
      console.log('Login reducers: ', action);
      return {
        ...state,
        isLogin: true,
        user: action.user,
        token: action.token,
      };
    case SET_LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}
