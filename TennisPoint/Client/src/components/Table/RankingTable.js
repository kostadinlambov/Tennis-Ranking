import React, { Component } from 'react';
import TableRow from './TableRow'



export default class PlayersRankingTable extends Component {
    render() {

        console.log(this.props.playersArr)
        return (
            <div className="container">
                
                <h1 className="m-auto pt-5 pb-5">Live Ranking</h1>
               
                <table className="table table-bordered table-hover table-sm">

                    <thead>
                        <tr className="table-success">
                            <th>Position</th>
                            <th>Pic</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Country</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.playersArr.map((player, i) => <TableRow key={i} {...player} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}