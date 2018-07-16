import React ,{ Component} from 'react'
import { Redirect } from 'react-router-dom'
import Input from '../common/Input';
import fetcher from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'

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
            if (response.success == true) {
                // observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { type: 'success', message: response.message })
                localStorage.setItem('userId', response.id)
                localStorage.setItem('email', response.email)
                localStorage.setItem('roles', response.roles)

                this.setState({ fireRedirect: true })
            } else {
                observer.trigger(observer.events.notification, { type: 'error', message: response.message });
                this.setState({ email: '', password: '' })
            }


        })
    }

    render() {

        if (this.state.fireRedirect == true) {
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

