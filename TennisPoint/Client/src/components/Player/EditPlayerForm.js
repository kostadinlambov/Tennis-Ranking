import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Input from '../common/Input';
import fetcher from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'

export default class EditPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
            weight: '',
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount = () => {
        let earnings = '';
        this.props.location.state.earnings.split('').forEach(element => {
            console.log(element)
            if (element != '.' && element != '$') {
                earnings += element
            }
        });

        earnings = Number(earnings);

        // console.log(this.props.location.state.prizeMoney)
        // console.log(...this.props.location.state)


        // this.props.location.state.prizeMoney.split()

        this.setState({
            id: this.props.location.state.id,
            firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            country: this.props.location.state.country,
            birthdate: this.props.location.state.birthdate,
            birthplace: this.props.location.state.birthplace,
            earnings: earnings,
            height: this.props.location.state.height,
            imageUrl: this.props.location.state.imageUrl,
            points: this.props.location.state.points,
            residence: this.props.location.state.residence,
            weight: this.props.location.state.weight,
        })
  

        console.log(this.state)
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        fetcher.post('/players/edit/' + this.state.id, { ...this.state }, (response) => {
            if (response.success == true) {
                // observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { type: 'success', message: response.message })


                this.setState({ fireRedirect: true })
            } else {
                observer.trigger(observer.events.notification, { type: 'error', message: response.message });
                // this.setState({
                //     category: '',
                //     city: '',
                //     country: '',
                //     startDate: '',
                //     endDate: '',
                //     officialName: '',
                //     prizeMoney: '',
                //     surface: '',
                //     website: '',
                // })
            }
        })
    }

    render() {
        console.log(this.props)
        if (this.state.fireRedirect == true) {
            return <Redirect to="/players" />
        }
        return (
            <div className="container">
                <h1 className="mt-5 mb-5 p-auto">Create Player</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <Input
                        name="firstName"
                        value={this.state.firstName}
                        type="text"
                        onChange={this.onChangeHandler}
                        label="FirstName "
                    />
                    <Input
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="LastName "
                    />

                    <Input
                        name="country"
                        value={this.state.country}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Country "
                    />

                       <Input
                        name="residence"
                        value={this.state.residence}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Residence "
                    />
                    <Input
                        name="birthdate"
                        value={this.state.birthdate}
                        onChange={this.onChangeHandler}
                        type="date"
                        label="Birthdate "
                    />
                    <Input
                        name="birthplace"
                        value={this.state.birthplace}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Birthplace "
                    />
                    <Input
                        name="earnings"
                        value={this.state.earnings}
                        onChange={this.onChangeHandler}
                        type="number"
                        label="Earnings "
                    />
                    <Input
                        name="height"
                        value={this.state.height}
                        onChange={this.onChangeHandler}
                        type="number"
                        label="Height "
                    />
                    <Input
                        name="weight"
                        value={this.state.weight}
                        onChange={this.onChangeHandler}
                        type="number"
                        label="Weight "
                    />
                    <Input
                        name="points"
                        value={this.state.points}
                        onChange={this.onChangeHandler}
                        type="number"
                        label="Points "
                    />
                    <Input
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.onChangeHandler}
                        type="text"
                        label="Image Url "
                    />
                    <input type="submit" className="btn btn-primary" value="Create" />
                </form>
            </div>
        );
    }
}

