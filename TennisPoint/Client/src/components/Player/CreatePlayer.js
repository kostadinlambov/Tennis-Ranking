import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Input from '../common/Input';
import fetcher from '../../infrastructure/requester'
import observer from '../../infrastructure/observer'

export default class CreatePlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // playersArr: [],
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

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();

        fetcher.post('/players/create', { ...this.state }, (response) => {
            if (response.success == true) {

                // observer.trigger(observer.events.loginUser, res.username)
                observer.trigger(observer.events.notification, { type: 'success', message: response.message })

                this.setState({ fireRedirect: true })
            } else {
                observer.trigger(observer.events.notification, { type: 'error', message: response.message });
                this.setState({
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
                    weight: ''
                })
            }
        })
    }

    render() {

        if (this.state.fireRedirect == true) {
            return <Redirect to="/ranking" />
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




