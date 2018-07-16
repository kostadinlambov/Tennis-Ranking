import React, { Component } from 'react';
import utilityService from '../../infrastructure/utilityService'
import PlayersTournamentRow from './PlayersTournamentRow'

export default class TournamentsPlayersTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playersData: ''
        }
    }

    render() {
        console.log('TournamentsPlayersTable', this.props.playersData)
        return (
            <div>
                <table className="table table-bordered table-hover table-sm">
                    <thead>
                        <tr className="table-success">
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Round</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.playersData.map((player, i) => <PlayersTournamentRow key={i} {...player} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}