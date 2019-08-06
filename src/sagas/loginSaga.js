import { call, put, cancelled, take, fork, cancel } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { loginUserSuccess, loginUserFailure, setClient, unsetClient } from '../actions';
import {
  LOGIN_USER_REQUEST_SAGA,
  LOGIN_USER_FAILURE,
  LOGOUT
} from '../constants';

function loginApi(email, password) {
  return fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(json => json)
    .catch(error => { throw error });
}

function* logout() {
  yield put(unsetClient());
  // yield put(push('/login'));
}

function* loginFlow(email, password) {
  try {
    const response = yield call(loginApi, email, password);
    if (response.token) {
      yield put(setClient(response));
      yield put(loginUserSuccess(response.token));
      yield put(push('/main'));
    } else {
      yield put(loginUserFailure(response));
    }
  } catch (error) {
    yield put(loginUserFailure(error));
  } finally {
    if (yield cancelled()) {
      yield put(push('/login'));
    }
  }
}

function* loginWatcher() {
  while (true) {
    const action = yield take([LOGIN_USER_REQUEST_SAGA, LOGOUT]);
    if (action.type === LOGIN_USER_REQUEST_SAGA) {
      console.log('email, password: ', action.email, action.password);
      const task = yield fork(loginFlow, action.email, action.password);
      yield take([LOGOUT, LOGIN_USER_FAILURE]);
      yield cancel(task);
    }
    yield call(logout);
  }
}

export default loginWatcher;