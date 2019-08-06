const {
  CLIENT_SET,
  CLIENT_UNSET,
  LOGIN_USER_SUBMIT,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST_SAGA,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_REQUEST_SAGA,
  GET_USER_DATA_REQUEST_SAGA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  LOGOUT
} = require('../constants/actionTypes');

const signupUserRequest = ({ email, password }) => ({
  type: SIGNUP_USER_REQUEST_SAGA,
  email,
  password
});

const signupUserSuccess = (data) => ({
  type: SIGNUP_USER_SUCCESS,
  payload: data
});

const signupUserFailure = (errors) => ({
  type: SIGNUP_USER_FAILURE,
  payload: errors
});

const loginUserSubmit = (data) => ({
  type: LOGIN_USER_SUBMIT,
  payload: data
});

const loginUserRequest = ({ email, password }) => ({
  type: LOGIN_USER_REQUEST_SAGA,
  email,
  password
});

const loginUserSuccess = (token) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    token
  }
});

const loginUserFailure = (message) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: message
  }
};

const logout = () => ({
  type: LOGOUT
});

const setClient = ({ token, user }) => ({
  type: CLIENT_SET,
  payload: {
    user,
    token
  }
});

const unsetClient = () => ({
  type: CLIENT_UNSET,
});

const getUserDataRequest = (token) => ({
  type: GET_USER_DATA_REQUEST_SAGA,
  payload: {
    token
  }
});

const getUserDataSuccess = (user) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: user
});

const getUserDataFailure = (error) => ({
  type: GET_USER_DATA_FAILURE,
  payload: {
    message: error.message
  }
});


module.exports = {
  getUserDataRequest,
  getUserDataSuccess,
  getUserDataFailure,
  signupUserRequest,
  signupUserSuccess,
  signupUserFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  logout,
  setClient,
  unsetClient
};