import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

class TableRow extends Component {
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

        if (this.state.fireRedirect == true) {
            return <Redirect to={"/players/details/" + this.props.id} />
        }
        return (
            <tr onClick={this.handleClick.bind(this)}>
                <td>{this.props.position}</td>
                <td><img src={this.props.imageUrl} style={{ className: 'img-thumbnail', width: 50, height: 50 }} /></td>
                <td>{this.props.name}</td>
                <td>{this.props.age}</td>
                <td>{this.props.country}</td>
                <td>{this.props.points}</td>
            </tr>
        )
    }
}

export default TableRow