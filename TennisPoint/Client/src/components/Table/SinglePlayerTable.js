import React, { Component } from 'react';
import TableRow from './TableRow'

export default class SingleRankingTable extends Component {
    render() {
        console.log(this.props.playersArr)
        return (
            <div>
                <table className="table table-bordered table-hover table-sm">
                    <tbody>
                        {this.props.playersArr.map((player, i) => <TableRow key={i} {...player} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}