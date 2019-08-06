import { CLIENT_SET, CLIENT_UNSET } from '../constants';

const initialSate = {
  user: undefined,
  token: undefined
};

const reducer = function clientReducer(state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET: {
      console.log('CLIENT_SET', action);
      return {
        user: action.payload.user,
        token: action.payload.token,
      }
    }
    case CLIENT_UNSET: {
      console.log('CLIENT_UNSET', action);
      return {
        user: undefined,
        token: undefined,
      }
    }
    default:
      return state;
  }
};

export default reducer;
