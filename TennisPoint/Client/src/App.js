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
import Player from './components/Player/Player'
import AllTournamentsPage from './components/tournament/AllTournamentsPage';
import SingleTournamentPage from './components/tournament/SingleTournamentPage';
import CreateTournament from './components/tournament/CreateTournamentForm';
import CreatePlayer from './components/Player/CreatePlayer';
import EditTournament from './components/tournament/EditTournamentForm';
import EditPlayer from './components/Player/EditPlayerForm';

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
                        <Route path="/login" exact  component={LoginPage} />
                        <Route path="/register" exact component={RegisterPage} />
                        <Route path="/ranking" exact component={PlayersRankingPage} />
                        <Route path="/tournaments" exact component={AllTournamentsPage} />
                        <Route path="/tournaments/create" exact component={CreateTournament} />
                        <Route path="/tournaments/edit/:id" exact component={EditTournament} />
                        <Route path="/players/edit/:id" exact component={EditPlayer} />
                        <Route path="/players/create" exact component={CreatePlayer} />
                        <Route path="/players/details/:id/:position?" exact component={Player} />
                        <Route path="/tournaments/details/:id" exact component={SingleTournamentPage} />
                        <Route component={HomePage} />

                    </Switch>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default withRouter(App);