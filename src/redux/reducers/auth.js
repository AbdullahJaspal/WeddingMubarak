import * as types from '../actions/types';
import {AUTH_PENDING, AUTH_ERROR} from '../actions/auth';
import Theme from '../../Theme/Theme';

const initialState = {
  token: '',
  call: '',
  userData: {},
  loggedIn: false,
  likeSubs: false,
  premiumSubs: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CALL_API:
      return {
        ...state,
        call: action.payload,
      };
    case types.STOP_API:
      return {
        ...state,
        call: '',
      };
    case types.SAVE_USER_DATA:
      return {
        ...state,
        loggedIn: true,
        userData: action.payload,
      };
    case types.LIKE_SUBS:
      return {
        ...state,
        likeSubs: action.payload,
      };
    case types.PREMIUM_SUBS:
      return {
        ...state,
        premiumSubs: action.payload,
      };
    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userData: {},
      };
    default:
      return state;
  }
};
