import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { signupUserRequest } from '../actions';
import '../App.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      message: null
    }
  }

  submit = (values) => {
    if (!values.email || !values.password) {
      this.setState({ message: 'Fill in all fields' })
    }
    else if (values.repeatPassword !== values.password) {
      this.setState({ message: 'Passwords must be equal' })
    }
    else this.props.signupUserRequest(values);
  };
  
  componentDidUpdate(prevProps) {
    if(prevProps.message !== this.props.message) {
      this.setState({ message: this.props.message })
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      isCreated,
      message,
      history
    } = this.props;

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    
    return (
      <div className="App">
        <Jumbotron>
          <Container>
            <Row className="justify-content-sm-around margin-bottom">
              <Col>
                <h3>Sign up</h3>
              </Col>
            </Row>
            <Row className="justify-content-sm-around">
              <Col lg={4} xs={10}>
                <Form noValidate onSubmit={ handleSubmit(this.submit) }>
                  <Form.Group as={ Row } controlId="formPlaintextEmail">
                    <Form.Label column className="form__label-signup">
                      Email
                    </Form.Label>
                    <Col>
                      <Field
                          name="email"
                          id="email"
                          label="Email"
                          component="input"
                          type="email"
                          placeholder="email@example.com" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={ Row } controlId="formPlaintextPassword">
                    <Form.Label column className="form__label-signup">
                      Password
                    </Form.Label>
                    <Col>
                      <Field
                          name="password"
                          id="password"
                          component="input"
                          type="password"
                          placeholder="Password"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={ Row } controlId="formPlaintextPassword">
                    <Form.Label column className="form__label-signup">
                      Repeat password
                    </Form.Label>
                    <Col>
                      <Field
                          name="repeatPassword"
                          id="repeatPassword"
                          component="input"
                          type="password"
                          placeholder="Repeat password" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={ Row }>
                    <Col >
                      <Button type="submit">Sign up</Button>
                    </Col>
                    <Col >
                      <Button onClick={ reset } type="button">Reset</Button>
                    </Col>
                  </Form.Group>
                  {
                    this.state.message ?
                      <Form.Group>
                        <Form.Text>
                          <Alert variant="primary">
                            { this.state.message }
                          </Alert>
                        </Form.Text>
                      </Form.Group>
                      : null
                  }
                </Form>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

Signup.propTypes = {
  message: PropTypes.string,
  isCreated: PropTypes.bool,
  handleSubmit: PropTypes.func,
  signupUserRequest: PropTypes.func,
};

const mapStateToProps = state => ({
  message: state.signup.message,
  isCreated: state.signup.isCreated
});

const connected = connect(mapStateToProps, { signupUserRequest })(withRouter(Signup));

const formed = reduxForm({
  form: 'signup',
})(connected);


export default formed;