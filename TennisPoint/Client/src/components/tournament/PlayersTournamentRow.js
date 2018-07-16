import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

class PlayersTournamentRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fireRedirect: false
        }
    }
    handleClick = () => {
        this.setState({ fireRedirect: true })
    }

    render() {

        console.log(this.props)
        if (this.state.fireRedirect == true) {
            return <Redirect to={"/players/details/" + this.props._id} />
        }

        let name = this.props.firstName + ' ' + this.props.firstName
        return (
            <tr onClick={this.handleClick.bind(this)}>
                <td>{name}</td>
                <td><img src={this.props.imageUrl} style={{ className: 'img-thumbnail', width: 50, height: 50 }} /></td>
                <td>{this.props.round}</td>
                <td>{this.props.tournamentPoints}</td>
            </tr>
        )
    }
}

export default PlayersTournamentRow