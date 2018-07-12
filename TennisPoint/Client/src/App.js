import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import Notifications from './components/common/Notifications'
import Footer from './components/common/Footer'
import './style/bootstrap.min.css'
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import PlayersRankingPage from './components/Ranking/PlayersRankingPage';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container">
                <div className="text-center mt-4">
                    <Notifications />
                    <Header loggedIn={localStorage.getItem('userId') != null} onLogout={this.onLogout} />

                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <Route path="/ranking" component={PlayersRankingPage} />
                    </Switch>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default withRouter(App);