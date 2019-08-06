import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';

const Main = () => (
  <div className="App">
    <Jumbotron>
      <Container>
        <Row>
          <Col>
            <h3>Main</h3>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  </div>
);

export default Main;