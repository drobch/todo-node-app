import { call, put, takeLatest } from 'redux-saga/effects';
import { signupUserSuccess, signupUserFailure } from '../actions';
import { SIGNUP_USER_REQUEST_SAGA } from '../constants';


function signupApi (email, password) {
  return fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => { throw error })
}

function* signupFlow (action) {
  try {
    const { email, password } = action;
    const response = yield call(signupApi, email, password);
    if(response.isCreated === false) {
      yield put(signupUserFailure(response));
    } else {
      yield put(signupUserSuccess(response));
    }
  } catch (error) {
    yield put(signupUserFailure(error));
  }
}

function* signupWatcher () {
  yield takeLatest(SIGNUP_USER_REQUEST_SAGA, signupFlow);
}

export default signupWatcher;
