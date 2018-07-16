import { NavLink, Link } from 'react-router-dom';
import React ,{ Component} from 'react';
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
        const roles = localStorage.getItem('roles')
        let isAdmin = false;
        if(roles != null && roles.includes('Admin')){
            isAdmin = true
        }
        const { loggedIn, onLogout } = this.props;

        const loggedInSection =
            <div id="profile">

                <Link to="/logout">logout</Link>
            </div>

        return (
            <header>
                <div className="container">
                    {loggedIn && <div className="modal-header" id="username">Hello, {localStorage.getItem('email')}!</div>}
                    <NavLink exact to="/" style={{ margin: 20 }} activeClassName="active">Home</NavLink>
                    {loggedIn && <NavLink to="/ranking" style={{ margin: 20 }} activeClassName="active">Tennis Ranking</NavLink>}
                    {loggedIn && <NavLink to="/tournaments" style={{ margin: 20 }} activeClassName="active">Tournaments</NavLink>}
                    {loggedIn && isAdmin && <NavLink to="/tournaments/create" style={{ margin: 20 }} activeClassName="active"> Create Tournament</NavLink>}
                    {loggedIn && isAdmin && <NavLink to="/players/create" style={{ margin: 20 }} activeClassName="active"> Create Player</NavLink>}

                    {loggedIn && <a href="javascript:void(0)" style={{ margin: 20 }} onClick={onLogout}>Logout</a>}

                    {!loggedIn && <NavLink to="/login" style={{ margin: 20 }} activeClassName="active">Login</NavLink>}
                    {!loggedIn && <NavLink to="/register" style={{ margin: 20 }} activeClassName="active">Register</NavLink>}
                </div>
            </header>
        );
    }
}