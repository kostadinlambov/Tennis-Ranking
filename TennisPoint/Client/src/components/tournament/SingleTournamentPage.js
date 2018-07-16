import React, { Component } from 'react';
import { Redirect, NavLink, Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'
import '../../style/table.css'
import utilityService from '../../infrastructure/utilityService'
import TournamentsPlayersTable from './TournamentsPlayersTable'

export default class SingleTournamentPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            category: '',
            city: '',
            country: '',
            startDate: '',
            endDate: '',
            officialName: '',
            prizeMoney: '',
            surface: '',
            website: '',
            players: [],
            playersData: [],
            fireRedirect: false,
            editRedirect: false
        }

    }

    componentDidMount = () => {
        let tournamentId = this.props.match.params.id
        // let playerPosition = this.props.match.params.position
        console.log('tournamentId: ', tournamentId)
        requester.get('/tournaments/getById/' + tournamentId, data => {
            console.log('tournametntData', data)

            const tournamentData = data.tournament
            const playersData = data.tournamentPlayers

            console.log(tournamentData)
            console.log(playersData)

            const officialName = tournamentData.officialName
            const category = tournamentData.category
            const city = tournamentData.city
            const country = tournamentData.country
            const startDate = utilityService.convertDate(tournamentData.startDate)
            const endDate = utilityService.convertDate(tournamentData.endDate)
            const prizeMoney = utilityService.convertEarnings(tournamentData.prizeMoney)
            const surface = tournamentData.surface
            const website = tournamentData.website
            const tournamentId = tournamentData._id
            const imageUrl = tournamentData.imageUrl

            // debugger
            this.populatePlayerData(tournamentId, playersData);
            this.setState({
                id: tournamentId,
                category: category,
                city: city,
                country: country,
                startDate: startDate,
                endDate: endDate,
                officialName: officialName,
                prizeMoney: prizeMoney,
                surface: surface,
                website: website,
                playersData: playersData,
                imageUrl: imageUrl
            })

            observer.trigger(observer.events.notification, { type: 'success', message: data.message })
        })
    }



    populatePlayerData = (tournamentId, playersData) => {
        for (let currentPlayer of playersData) {
            for (let currentTournament of currentPlayer.tournaments) {
                let currentTournamentId = currentTournament.tournament
                if (tournamentId === currentTournamentId) {
                    currentPlayer.tournamentPoints = currentTournament.points
                    currentPlayer.round = currentTournament.round
                }
            }

            this.sortByPoints(playersData)
        }
    }

    sortByPoints = (playersData) => {
        // debugger
        const sortedPlayerssObj = playersData.sort((a, b) => {
            return b.tournamentPoints - a.tournamentPoints
        })

        this.setState({
            playersData: sortedPlayerssObj
        })
    }

    onSubmitHandlerDelete = (e) => {
        e.preventDefault();
        console.log(this.state.id)
        debugger

        requester.post('/tournaments/delete/' + this.state.id, {}, (response) => {
            debugger
            if (response.success == true) {

                // observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { type: 'success', message: response.message })


                this.setState({ fireRedirect: true })
            } else {
                observer.trigger(observer.events.notification, { type: 'error', message: response.message });
            }
        })
    }

    onSubmitHandlerEdit = (e) => {
        // e.preventDefault();
        console.log(this.state.id)
     
        this.props.history.push({
            pathname: "/tournaments/edit/" + this.state.id,
            state:
                { ...this.state }
        });
    }



    render = () => {
        const website = this.state.website

        const roles = localStorage.getItem('roles')
        let isAdmin = false;
        if (roles != null && roles.includes('Admin')) {
            isAdmin = true
        }

        let loggedIn = false

        if (localStorage.getItem('userId')) {
            loggedIn = true
        }
        if (this.state.editRedirect == true) {
            return <Redirect to={"/tournaments/edit/" + this.state.id} {...this.state} />
        }

        if (this.state.fireRedirect == true) {
            return <Redirect to={"/tournaments"} />
        }

        const deleteButton = (
            <button
                type="button"
                className="btn btn-danger m-5"
                onClick={this.onSubmitHandlerDelete.bind(this)}>
                Delete
            </button>
        )

        const editButton = (
            <button
                type="button"
                className="btn btn-warning m-5"
                onClick={this.onSubmitHandlerEdit.bind(this)}>
                Edit
                {/* <Link to={'/tournaments/edit/' + this.state.id} className="editPost">Edit</Link> */}
            </button>
        )

        return (
            <div className="container">
                <header>
                    <div className="container">
                        {loggedIn && <NavLink to="/tournaments" style={{ margin: 20 }} activeClassName="active">Delete</NavLink>}
                    </div>
                </header>

                <div>
                    <div className="container">
                        <h1 className="pt-5">{this.state.officialName} </h1>
                        <div className="container d-flex justify-content-between mt-5">
                            <div className="d-flex m-auto ">
                                <div className="p-2"><img src={this.state.imageUrl} style={{ className: 'img-thumbnail', width: 300, height: 300 }} /></div>
                            </div>
                            <table className="table table-bordered table-hover table-sm" style={{}}>
                                <tbody>
                                    <tr>
                                        <td>Category</td>
                                        <td>{this.state.category}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>{this.state.officialName}</td>
                                    </tr>

                                    <tr>
                                        <td>City</td>
                                        <td>{this.state.city}</td>
                                    </tr>
                                    <tr>
                                        <td>Country</td>
                                        <td>{this.state.country}</td>
                                    </tr>
                                    <tr>
                                        <td>StartDate</td>
                                        <td>{this.state.startDate}</td>
                                    </tr>
                                    <tr>
                                        <td>EndDate</td>
                                        <td>{this.state.endDate}</td>
                                    </tr>
                                    <tr>
                                        <td>PrizeMoney</td>
                                        <td>{this.state.prizeMoney}</td>
                                    </tr>
                                    <tr>
                                        <td>Surface</td>
                                        <td>{this.state.surface}</td>
                                    </tr>
                                    <tr>
                                        <td>Website</td>
                                        <td>{website}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        {/* <div className="controls">
                            <ul>
                                <li className="action">
                                    <Link to={'/catalog/details/' + this.props._id}>Details</Link>
                                </li>
                                <li className="action">
                                    <Link to='/' className="editPost">Edit</Link>
                                </li>
                                <li className="action">
                                    <Link to="/" className="deletePost">Delete</Link>
                                </li>
                            </ul>
                        </div> */}

                        <div className="d-inline flex-row justify-content-between  ">
                            {loggedIn && isAdmin && deleteButton} {loggedIn && isAdmin && editButton}

                        </div>


                        <br />
                        <h1>Players</h1>
                        <br />
                        <TournamentsPlayersTable playersData={this.state.playersData} />
                    </div>
                </div>
            </div>
        )
    }
}