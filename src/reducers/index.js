import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';
import clientReducer from './clientReducer';
import userReducer from './userReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  client: clientReducer,
  user: userReducer,
  form: formReducer,
  signup: signupReducer,
  login: loginReducer,
});

