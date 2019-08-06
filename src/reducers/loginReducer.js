import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT
} from '../constants'

const initialState = {
  success: false,
  message: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS: {
      console.log('LOGIN_USER_SUCCESS');
      return {
        success: true,
        token: action.payload.token
      };
    }
    case LOGIN_USER_FAILURE: {
      console.log('LOGIN_USER_FAILURE');
      return {
        success: false,
        message: action.payload.message
      };
    }
    case LOGOUT: {
      console.log('LOGOUT', action);
      return {
        success: true
      };
    }
    default:
      return state;
  }
};

export default reducer;