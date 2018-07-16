import React, { Component, Redirect } from 'react';
import requester from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'
import '../../style/player.css'
import utilityService from '../../infrastructure/utilityService'
import PlayersTournamentsTable from '../Table/PlayersTournamentsTable';

// let tournamentsData = []

export default class Player extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // playersArr: [],
            id: '',
            firstName: '',
            lastName: '',
            country: '',
            birthdate: '',
            birthplace: '',
            earnings: '',
            height: '',
            imageUrl: '',
            points: '',
            residence: '',
            tournaments: [],
            weight: '',
            position: '',
            tournamentsData: [],
            editRedirect: false,
            fireRedirect: false
        }
    }

    componentDidMount = () => {
        let playerId = this.props.match.params.id
        let playerPosition = this.props.match.params.position
        console.log('playerId: ', playerId)
        requester.get('/players/getByid/' + playerId, data => {
            console.log('playerData', data)
            const id = playerId
            const playerData = data.player
            const tournamentData = data.playerTournaments
            const birthdate = playerData.birthdate
            const earnings = playerData.earnings
            const age = utilityService.getAge(birthdate)
            const parsedBirtDate = utilityService.convertDate(birthdate)
            const parsedEarnings = utilityService.convertEarnings(earnings)

            this.populateTournamentData(tournamentData, playerData);

            this.setState({
                id:id,
                position: playerPosition,
                age,
                ...playerData,
                birthdate: parsedBirtDate,
                earnings: parsedEarnings,
                tournamentsData: tournamentData
            })

            observer.trigger(observer.events.notification, { type: 'success', message: playerData.message })
        })
    }

    populateTournamentData = (tournamentData, playerData) => {
        for (let currentTournament of tournamentData) {
            for (let tournament of playerData.tournaments) {
                if (currentTournament._id === tournament.tournament) {
                    currentTournament.points = tournament.points
                    currentTournament.round = tournament.round
                }
            }

        }

        this.sortByDate(tournamentData)

    }

    sortByDate = (tournamentsData) => {
        const sortedTornamentssObj = tournamentsData.sort((a, b) => {
            return a.startDate > b.startDate
        })

        this.setState({
            tournamentsData: sortedTornamentssObj
        })
    }

    onSubmitHandlerDelete = (e) => {
        e.preventDefault();
        console.log(this.state.id)
        debugger

        requester.post('/players/delete/' + this.state.id, {}, (response) => {
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
            pathname: "/players/edit/" + this.state.id,
            state:
                { ...this.state }
        });
    }

    render = () => {

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
                <h1 className="pt-5">{this.state.firstName} {this.state.lastName} </h1>

                <div className="container d-flex justify-content-between mt-5">
                    <div className="d-flex flex-column ">
                        <div className="p-2"><img src={this.state.imageUrl} style={{ className: 'img-thumbnail', width: 200, height: 200 }} /></div>
                        {this.state.position && <h4 className="p-2">Position: {this.state.position}</h4>}
                        <h5 className="p-2">Points: {this.state.points}</h5>
                    </div>

                    <table className="table table-bordered table-hover table-sm" style={{}}>
                        <tbody>
                            <tr>

                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>{this.state.country}</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>{this.state.age}</td>
                            </tr>
                            <tr>
                                <td>Birthdate</td>
                                <td>{this.state.birthdate}</td>
                            </tr>
                            <tr>
                                <td>Birthplace</td>
                                <td>{this.state.birthplace}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>{this.state.height}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{this.state.weight}</td>
                            </tr>
                            <tr>
                                <td>Residence</td>
                                <td>{this.state.residence}</td>
                            </tr>
                            <tr>
                                <td>Earnings</td>
                                <td>{this.state.earnings}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="d-inline flex-row justify-content-between  ">
                    {loggedIn && isAdmin && deleteButton} {loggedIn && isAdmin && editButton}

                </div>


                <br />
                <h1>Tournaments</h1>
                <br />
                <PlayersTournamentsTable tournamentsData={this.state.tournamentsData} />
            </div>

        )
    }
}