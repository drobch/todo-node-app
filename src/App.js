import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import User from './components/User';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <Switch>
    <Route path="/" component={ Main } />
    <Route path="/main" component={ Main } />
    <Route path="/login" component={ Login } />
    <Route path="/signup" component={ Signup } />
    <ProtectedRoute exect path="/user" component={ User } />
  </Switch>
);

export default App;
