import Input from '../common/Input';
import { register } from '../../api/remote';
import fetcher from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'
import React ,{ Component} from 'react';
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
            message: '',
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

        if (this.state.password.length < 6) {
            observer.trigger(observer.events.notification, { type: 'error', message: 'Passwords must be at least 6 characters long.' });
            this.setState({ error: 'Passwords must be at least 6 characters long.' })
            // console.log('Passwords must be at least 6 characters long.')
            console.log(this.state.error)
        } else if (this.state.password !== this.state.repeat) {
            observer.trigger(observer.events.notification, { type: 'error', message: 'Password must match repeat password' });
            this.setState({ error: 'Password must match repeat password' })
            // console.log('Password must match repeat password')
            console.log(this.state.error)
        } else {
            fetcher.post('/users/register', { password: this.state.password, email: this.state.email }, (response) => {
                console.log(response);
                console.log(response);
                // this.setRedirect();
                // this.renderRedirect(); )

                if (response.success == true) {

                    observer.trigger(observer.events.notification, { type: 'success', message: response.message })
                    localStorage.setItem('userId', response.id)
                    localStorage.setItem('email', response.email)
                    this.setState({ fireRedirect: true })
                }
            })
        }
    }


    render() {
        if (this.state.fireRedirect == true) {
            return <Redirect to="/" />
        }

        // const { fireRedirect } = this.state

        return (
            <div className="container">
                <h1>Register</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="email"
                        type="email"
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