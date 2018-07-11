import React, { Component } from 'react';
import Input from '../common/Input';
import { login } from '../../api/remote';
import fetcher from '../../infrastructure/requester'
import { Redirect } from 'react-router-dom'

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        fetcher.post('/users/login', { password: this.state.password, email: this.state.email }, (response) => {
            console.log(response);
            console.log(response);
            // this.setRedirect();
            // this.renderRedirect(); )
            debugger
            localStorage.setItem('userId', response.id)
            localStorage.setItem('email', response.email)
            this.setState({ fireRedirect: true })
        })
    }

    render() {

        if(this.state.fireRedirect == true){
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password "
                    />
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        );
    }
}

