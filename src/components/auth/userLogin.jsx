import React, { Component } from 'react'
 
import store from 'store';
import isLoggedIn from '../../helper/is_logged_in'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormText, FormFeedback, NavLink
  } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom'
import Axios from 'axios';

 
export default class UserLogin extends Component {
    constructor(props) {
        super(props);
          this.state = {
          'email': '',
          'password': '',
          validate: {
            emailState: '',
          },
        }
        this.handleChange = this.handleChange.bind(this);
      }
    
      validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
          if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
          } else {
            validate.emailState = 'has-danger'
          }
          this.setState({ validate })
        }
    
      handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
      }

    onSignIn = event => {
        event.preventDefault();
        const { email, password } = this.state
        Axios.post(`http://localhost:6780/api/user/login`,
            {
                email: email,
                password: password
            })
            .then(response => {
                this.setState({
                    dataUser: response.data
                })
                if(response.data.auth_token !== ''){
                    localStorage.setItem('TOKEN', response.data.token)
                    localStorage.setItem('USER_ID', '1')
                    store.set('loggedIn', true);
                    this.props.history.push('/')
                }
            })
    }
 
 
    render() {

        console.log('ini jwt', isLoggedIn())
        console.log('aakah error?', this.state.error)
        console.log('data user', this.state.dataUser)
        console.log('ini token', localStorage.getItem('TOKEN'))
        console.log('ini token', localStorage.getItem('USER_ID'))
        if (isLoggedIn()) {
            return <Redirect to='/' />
        }
 
        
        return (
            <Container className="App">
              <h2>Sign In</h2>
              <Form className="form" onSubmit={ (e) => this.onSignIn(e) }>
                <Col>
                  <FormGroup>
                    <Label>E-Mail</Label>
                    <Input
                      type="email"
                      name="email"
                      id="exampleEmail"
                      placeholder="myemail@email.com"
                      // eslint-disable-next-line no-undef
                      value={ this.state.email }
                      valid={ this.state.validate.emailState === 'has-success' }
                      invalid={ this.state.validate.emailState === 'has-danger' }
                      onChange={ (e) => {
                                  this.validateEmail(e)
                                  this.handleChange(e)
                                } }
                    />
                    <FormFeedback valid>
                      That's a tasty looking email you've got there.
                    </FormFeedback>
                    <FormFeedback>
                      Uh oh! Looks like there is an issue with your email. Please input a correct email.
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="********"
                      // eslint-disable-next-line no-undef
                      value={ this.state.password }
                      onChange={ (e) => this.handleChange(e) }
                  />
                  </FormGroup>
                </Col>
                <Button>Submit</Button>
            </Form>
            <NavLink><Link to="/register">klik link ini untuk register</Link></NavLink>
            </Container>
          );
      
    }
}