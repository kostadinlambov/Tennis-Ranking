
import React, { Component } from 'react';
import TableRow from './TableRow'



export default class PlayersRankingTable extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            // playersArr: [],
            // id: '',
            // firstName: '',
            // lastName: '',
            // country: '',
            // birthdate: '',
            // birthplace: '',
            // earnings: '',
            // height: '',
            // imageUrl: '',
            // points: '',
            // residence: '',
            // tournaments: [],
            // weight: '',
        }
    }
    render() {
        return (
            <div>
                <table className="table table-bordered table-hover table-sm">
                    <tbody>
                        <tr className="table-success">
                            <th>Position</th>
                            <th>Pic</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Country</th>
                            <th>Points</th>
                        </tr>

                        {this.props.playersArr.map((player, i) => <TableRow key={player.id} {...player} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}