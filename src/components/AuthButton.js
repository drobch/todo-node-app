import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';

import { logout } from '../actions';
import '../App.css';

const AuthButton = withRouter(({ history, token, logout }) => (
  <Nav>
    {
      token ? (
        <>
          <Nav.Item variant="info" onClick={logout}>
            <Nav.Link href="/logout">
              Logout
            </Nav.Link>
          </Nav.Item>
          <Nav.Item variant="info">
            <Nav.Link href="/user">
              User
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <>
          <Nav.Item variant="info">
            <Nav.Link href="/login">
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item variant="info">
            <Nav.Link href="/signup">
              Signup
            </Nav.Link>
          </Nav.Item>
        </>
      )
    }
    <Nav.Item variant="info">
      <Nav.Link href="/main">
        Main
      </Nav.Link>
    </Nav.Item>
  </Nav>
));


const mapStateToProps = state => ({
  token: !!state.client.token
});

export default connect(mapStateToProps, { logout })(AuthButton);
