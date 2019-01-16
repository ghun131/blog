import React from 'react';
import './Register.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Congratulation from './Congratulation';
import Spinner from '../Spinner';
import axios from 'axios';

class Register extends React.Component {
        nameRef = React.createRef()
        emailRef = React.createRef()
        passRef = React.createRef()
        passConfRef = React.createRef();

        state = {
                loading: false,
                message: '',
                isSignedUp: false
        }

        handleRegister = (e) => {
                e.preventDefault();
        
                this.setState({ loading: true });
                const payload = {
                        username: this.nameRef.current.value,
                        email: this.emailRef.current.value,
                        password: this.passRef.current.value,
                        passwordConf: this.passConfRef.current.value
                }
                console.log(payload)
                if (payload.email === '' || payload.password === '') {
                        this.setState({ message: 'Don\' leave anything empty!!!!',
                                        loading: false })
                    setTimeout(() => this.setState({ message: '' }), 3000);
                } else  {
                    axios.post('/register', {payload})
                        .then( res => {
                                this.setState({ 
                                        message: res.data.message,
                                        loading: false
                                })
                                if (res.data.success) {
                                        console.log(res.data);
                                        this.setState({ message: res.data.message,
                                                        isSignedUp: true,
                                                        loading: false })
                                        setTimeout(() => {
                                                this.setState({ message: '' });
                                        }, 3000);
                                }
                        }).catch( error => console.log(error) );
                }
        }

        render() {
                let content;
                if (this.state.loading) {
                        content = <Spinner />
                } else if (this.state.isSignedUp) {
                        content = 
                        <Switch>
                                <Route path='/register/congratulation' component={Congratulation} />
                                <Redirect from='/register' to='/register/congratulation' />
                        </Switch>
                } else {
                        content = 
                        <div className="Register">
                                <h1>Sign up</h1>
                                <form onSubmit={this.handleRegister}>
                                
                                        <div className="Wrapper">
                                        <label htmlFor="id">User Name (or ID): </label>
                                        <input  type="text" 
                                                name="username" 
                                                ref={this.nameRef}/>

                                        <label htmlFor="email">Email Adress: </label>
                                        <input  type="email" 
                                                name="email"
                                                ref={this.emailRef}/>

                                        <label htmlFor="pass">Password that you want: </label>
                                        <input  type="password" 
                                                name="password"
                                                ref={this.passRef}/>

                                        <label htmlFor="age">Confirm your password: </label>
                                        <input  type="password" 
                                                name="passwordConf"
                                                ref={this.passConfRef}/>
                                        <div className="Message">{this.state.message}</div>
                                        </div>

                                        <Button variant="contained"
                                                color="secondary"
                                                type="submit"
                                                value="Sign Up!">
                                        <strong>Sign Up!</strong>
                                        </Button>
                                </form>
                        </div>
                }

                return content;
        }
}

export default Register;
