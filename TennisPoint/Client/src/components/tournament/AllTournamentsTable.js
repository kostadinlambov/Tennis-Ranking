import React, { Component } from 'react';
import AllTournamentsTableRow from './AllTournamentsTableRow'

export default class AllTournamnetsTable extends Component {
    render() {
        console.log(this.props.playersArr)
        return (
            <div className="container">

                <h1 className="container m-auto pt-5 pb-5">Tournaments</h1>

                <table className="table table-bordered table-hover table-sm">
                    <thead>
                        <tr className="table-success">

                            <th>Pic</th>
                            <th>Category</th>
                            <th>Official Name</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.tournamentsArr.map((tournament, i) => <AllTournamentsTableRow key={i} {...tournament} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}
