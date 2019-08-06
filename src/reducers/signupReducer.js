import {
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from '../constants';

const initialState = {
  isCreated: false,
  message: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SIGNUP_USER_SUCCESS: {
      console.log('SIGNUP_USER_SUCCESS');
      return {
        isCreated: action.payload.isCreated,
        message: action.payload.message,
      };
    }
    case SIGNUP_USER_FAILURE:
      console.log('SIGNUP_USER_FAILURE');
      return {
        isCreated: action.payload.isCreated,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default reducer;