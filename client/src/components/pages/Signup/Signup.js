import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        role: ''
      },
      showToast: false,
      toastText: ''
    }
    this.authService = new AuthService()
  }

  handleInputChange = e => this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } })

  handleSubmit = e => {
    e.preventDefault()

    this.authService
      .signup(this.state.user)
      .then(newUser => {
        this.props.storeUser(newUser.data)
        this.props.history.push('/courses')
        this.props.handleToast(true, 'Register successful!')
      })
      //.catch(err => this.props.setState({ showToast: true, toastText: err.response.data.message[0].msg }))
      .catch(err => this.props.handleToast(true, err.response.data.message[0].msg))
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <h1>Sign Up</h1>
            <hr />

            <Form validated={this.validated} onSubmit={this.handleSubmit}>

              <Form.Row>
                <Form.Group as={Col} md='5' controlId='username'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type='text'
                    name='username'
                    placeholder='popinez'
                    value={this.state.username}
                    onChange={this.handleInputChange} />
                  <Form.Text id='passwordHelpBlock' muted>
                    Your unsername must have more than 5 characters
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} md='7' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type='password'
                    name='password'
                    placeholder='fantasía caribeña'
                    value={this.state.password}
                    onChange={this.handleInputChange} />
                  <Form.Text id='passwordHelpBlock' muted>
                    Your password must have more than 4 characters and contain a number
                  </Form.Text>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md='7' controlId='email'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type='email'
                    name='email'
                    placeholder='pop@ino.dog'
                    value={this.state.email}
                    onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} md='5' controlId='role'>
                  <Form.Label>Choose role</Form.Label>
                  <Form.Control as='select' name='role' value={this.state.role} onChange={this.handleInputChange}>
                    <option>Student or Teacher?</option>
                    <option value='Student' >Student</option>
                    <option value='Teacher' >Teacher</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Button variant='dark' type='submit'>Let's start !</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>

      </Container>
    )
  }
}

export default Signup