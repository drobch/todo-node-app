import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import AuthButton from './components/AuthButton';
import createRootReducer from './reducers';
import rootSaga from './sagas';
import App from './App';
import './index.css';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const composeSetup = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function getAuthState() {
  try {
    const auth = JSON.parse(localStorage.getItem('auth-token')) || undefined;
    console.log('token', auth);
    return auth;
  } catch (err) {
    return undefined;
  }
}

const store = createStore(
  createRootReducer(history), {
    client: {
      ...getAuthState()
    }
  },
  composeSetup(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);

function setAuthState(state) {
  try {
    localStorage.setItem('auth-token', JSON.stringify({
      user: state.client.user,
      token: state.client.token
    }));
  } catch (err) {
    return undefined;
  }
}

store.subscribe(() => {
  setAuthState(store.getState());
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <AuthButton />
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
