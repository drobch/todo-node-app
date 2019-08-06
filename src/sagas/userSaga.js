import { call, put, takeLatest } from 'redux-saga/effects';
import { getUserDataSuccess, getUserDataFailure } from '../actions';
import { GET_USER_DATA_REQUEST_SAGA } from '../constants';

function getUserDataApi(token) {
  return fetch('http://localhost:5000/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${ token }`,
    },
  })
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error });
}

function* getUserDataFlow(action) {
  try {
    const response = yield call(getUserDataApi, action.payload.token);
    if (response.success === true) {
      yield put(getUserDataSuccess(response));
    } else
      yield put(getUserDataFailure(response));
  } catch (error) {
    yield put(getUserDataFailure(error));
  }
}

function* userWatcher() {
  yield takeLatest(GET_USER_DATA_REQUEST_SAGA, getUserDataFlow);
}

export default userWatcher;
