import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import observer from '../../infrastructure/observer'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.state = { username: null }

        observer.subscribe(observer.events.loginUser, this.userLoggedIn)
    }

    userLoggedIn = (username) => {
        this.setState({ username })
    }

    render() {
        const { loggedIn, onLogout } = this.props;

        const loggedInSection =
            <div id="profile">

                <Link to="/logout">logout</Link>
            </div>


        return (
            <header>
                {/* <nav className="navbar navbar-dark bg-primary"> */}
                <div className="container">
                    {/* <div className="row">
                            <div className="col-md-12"> */}
                    {loggedIn && <div className="text-right" id="username">Hello, {localStorage.getItem('email')}!</div>}
                    <NavLink exact to="/" style={{ margin: 20 }} activeClassName="active">Home</NavLink>
                    {loggedIn && <NavLink to="/ranking" style={{ margin: 20 }} activeClassName="active">Tennis Ranking</NavLink>}
                    {loggedIn && <NavLink to="/tournaments" style={{ margin: 20 }} activeClassName="active">Tournament</NavLink>}

                    {loggedIn && <a href="javascript:void(0)" style={{ margin: 20 }} onClick={onLogout}>Logout</a>}

                    {!loggedIn && <NavLink to="/login" style={{ margin: 20 }} activeClassName="active">Login</NavLink>}
                    {!loggedIn && <NavLink to="/register" style={{ margin: 20 }} activeClassName="active">Register</NavLink>}
                    {/* </div>
                        </div> */}
                </div>
                {/* // </nav> */}
            </header>
        );
    }
}