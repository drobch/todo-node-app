import {
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  LOGOUT
} from '../constants';

const initialState = {
  success: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS: {
      console.log('GET_USER_DATA_SUCCESS');
      return {
        success: true,
        user: action.payload.user
      };
    }
    case GET_USER_DATA_FAILURE: {
      console.log('GET_USER_DATA_FAILURE');
      return {
        success: false,
        message: action.error,
        user: {}
      };
    }
    case LOGOUT: {
      console.log('LOGOUT REDUCER');
      return {
        success: true,
        user: {}
      };
    }
    default:
      return state;
  }
};

export default reducer;