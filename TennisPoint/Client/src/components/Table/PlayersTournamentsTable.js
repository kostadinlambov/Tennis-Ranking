import React, { Component } from 'react';
import TournamentsTableRow from './TournamentTableRow';
import utilityService from '../../infrastructure/utilityService'

export default class PlayersTournamentsTable extends Component {
    render() {
        return (
            <div>
                <table className="table table-bordered table-hover table-sm">
                    <thead>
                        <tr className="table-success">
                            <th>Official Name</th>
                            <th>City</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Round</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.tournamentsData.map((tournament, i) => <TournamentsTableRow key={i} {...tournament} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}