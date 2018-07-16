import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import utilityService from '../../infrastructure/utilityService'


class TournamentsTableRow extends Component {
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
            return <Redirect to={"/tournaments/details/" + this.props._id} />
        }
        return (
            <tr onClick={this.handleClick.bind(this)}>
                <td>{this.props.officialName}</td>
                <td>{this.props.city}</td>
                {/* <td><img src={this.props.imageUrl} style={{ className: 'img-thumbnail', width: 50, height: 50 }} /></td> */}
                <td>{utilityService.convertDate(this.props.startDate)}</td>
                <td>{utilityService.convertDate(this.props.endDate)}</td>
                <td>{this.props.round}</td>
                <td>{this.props.points}</td>
            </tr>
        )
    }
}


export default TournamentsTableRow