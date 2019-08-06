import { all } from 'redux-saga/effects'
import SignupSaga from './signupSaga';
import LoginSaga from './loginSaga';
import UserSaga from './userSaga';

export default function* rootSaga() {
  yield all([
    SignupSaga(),
    LoginSaga(),
    UserSaga()
  ]);
};
