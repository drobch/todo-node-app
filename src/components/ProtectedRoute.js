import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';


const ProtectedRoute = ({ component: Component, token, ...rest }) => (
  <div>
    <Route {...rest} render={(props) => (
      token ? <Component {...props} />
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
  </div>
);

const mapStateToProps = state => ({
  token: state.client.token
});

export default connect(mapStateToProps)(ProtectedRoute);