import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUserDataRequest } from '../actions';
import '../App.css';

class User extends Component {
  componentDidMount() {
    this.props.getUserDataRequest(this.props.token);
  }
  
  render() {
    return (
      <div className="App">
        <Jumbotron>
          <Container>
            <Row className="margin-bottom">
              <Col>
                <h3>Profile</h3>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={3} sm={6}> Name </Col>
              <Col md={3} sm={6}>{this.props.user.name}</Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={3} sm={6}> Surname </Col>
              <Col md={3} sm={6}> {this.props.user.surname} </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col md={3} sm={6}> City </Col>
              <Col md={3} sm={6}> {this.props.user.city} </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  };
}

const mapStateToProps = ({ client, user }) => ({
  token: client.token,
  user: user.user
});

export default connect(mapStateToProps, { getUserDataRequest })(User);