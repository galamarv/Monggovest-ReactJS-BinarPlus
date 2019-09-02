import React, { Component } from 'react'
 
import store from 'store';
import isLoggedIn from '../../helper/is_logged_in'
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormText, FormFeedback,
  } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

 
export default class UserLogin extends Component {
    constructor(props) {
        super(props);
          this.state = {
          'email': '',
          'password': '',
          'first_name': '',
          'last_name' : '',
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

    onRegister = event => {
        event.preventDefault();
        //const { email, password, first_name, last_name } = this.state
        Axios.post(`http://localhost:6780/api/user/register`,
            {
                email: this.state.email,
                password: this.state.password,
                last_name : this.state.last_name,
                first_name : this.state.first_name
            })
            .then(response => {
                this.setState({
                    dataUser: response.data
                })
                alert(response.data);
                this.props.history.push('/login');
            }).catch(error => {
                console.log(error.message);
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
              <h2>Register</h2>
              <Form className="form" onSubmit={ (e) => this.onRegister(e) }>
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
                <Col>
                  <FormGroup>
                    <Label for="exampleFirstName">First Name</Label>
                    <Input
                      type="firstname"
                      name="first_name"
                      id="exampleFirstName"
                      placeholder="name"
                      // eslint-disable-next-line no-undef
                      value={ this.state.first_name }
                      onChange={ (e) => this.handleChange(e) }
                  />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="exampleLastName">Last Name</Label>
                    <Input
                      type="lastname"
                      name="last_name"
                      id="exampleLastName"
                      placeholder="name"
                      // eslint-disable-next-line no-undef
                      value={ this.state.last_name }
                      onChange={ (e) => this.handleChange(e) }
                  />
                  </FormGroup>
                </Col>
                <Button>Submit</Button>
            </Form>
            </Container>
          );
      
    }
}