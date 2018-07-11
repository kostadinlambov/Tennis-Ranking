import React, { Component } from 'react';
import Input from '../common/Input';
import { register } from '../../api/remote';
// import fetcher from '../../infrastructure/requester';
import fetcher from '../../infrastructure/requester'
import { Redirect } from 'react-router-dom'

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // name: '',
            email: '',
            password: '',
            repeat: '',
            error: '',
            fireRedirect: false
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        if (this.state.password === this.state.repeat) {
            fetcher.post('/users/register', { password: this.state.password, email: this.state.email }, (response) => {
                console.log(response);
                console.log(response);
                // this.setRedirect();
                // this.renderRedirect(); )
                debugger
                localStorage.setItem('userId', response.id)
                localStorage.setItem('email', response.email)
                this.setState({ fireRedirect: true })
            })
        } else {
            console.log('Password must match repeat password')
            this.setState({ error: 'Password must match repeat password' })
            console.log(this.state.error)
        }
    }

    
    render() {
        if(this.state.fireRedirect == true){
            return <Redirect to="/" />
        }

        // const { fireRedirect } = this.state

        return (
            <div className="container">
                <h1>Register</h1>
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
                        label="Password"
                    />
                    <Input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                        label="Repeat password"
                    />
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                {/* {fireRedirect && (
                    <Redirect to='/' />
                )} */}
            </div>
        );
    }
}