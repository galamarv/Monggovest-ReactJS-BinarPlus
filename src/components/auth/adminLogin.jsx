import React, { Component } from 'react'
 
import store from 'store';
import isLoggedIn from '../../helper/is_logged_in'
import { InputGroup, InputGroupAddon, Input, Button,Form,Container,FormGroup,Label,Col } from 'reactstrap';
 
import { Redirect } from 'react-router-dom'
import Axios from 'axios';
 
export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useremail: '',
            password: '',
            error: false,
            dataUser: {}
        }
        this.onChangeuseremail = this.onChangeuseremail.bind(this)
    }
 
    onChangeuseremail(event) {
        this.setState({
            useremail: event.target.value
        });
    }
    onChangePassword(event) {
        this.setState({
            password: event.target.value
        });
    }
    // onSingInBasic(event){
    //     event.preventDefault();
    //     this.setState({
    //         error: false
    //     })
    //     if(!(this.state.useremail === 'didik' && this.state.password === '123')){
    //         return this.setState({ error: true })
    //     }
 
    //     store.set('loggedIn', true);
    //     this.props.history.push('/investasi')
    // }
    onSignIn = event => {
        event.preventDefault();
        const { useremail, password } = this.state
        Axios.post(`http://localhost:6780/api/admin/login`,
            {
                email: useremail,
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
                    this.props.history.push('/adm-invest')
                }
            })
    }
 
    // onSignUp = event =>{
    //     event.preventDefault();
    //     Axios.post(`http://api-museek.herokuapp.com/auth/register`,
    //     {
    //         email: "tata@email.com",
    //         password: "tata"
    //     })
    //     .then(response => {
    //         this.setState({
    //           dataUser : response.data
    //         })
    //       })
    // }
 
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
            <div>
                <h1>LOGIN</h1>
                
                
                
                    <div>
                        <Form onSubmit={this.onSignIn}>
                            <FormGroup row>
                            <InputGroup>
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <Input type="text" value={this.state.useremail} onChange={this.onChangeuseremail} placeholder="useremail" />
                    </InputGroup>
                            </FormGroup>
                            <FormGroup row>
                            <InputGroup>
                        <InputGroupAddon addonType="prepend">*</InputGroupAddon>
                        <Input type="password" value={this.state.password} onChange={this.onChangePassword.bind(this)} placeholder="password" />
                    </InputGroup>
                            </FormGroup>
                            
                                <Button>Submit</Button>
                            
                        </Form>
                    </div>
                
            </div>
        )
    }
}